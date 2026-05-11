import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  jobPostingId: z.string(),
  pitch: z.string().min(20).max(280),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "SEEKER") {
    return NextResponse.json({ error: "Only job seekers can submit referral requests" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { jobPostingId, pitch } = createSchema.parse(body);

    // Get fresh user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check credits
    if (user.creditsBalance <= 0 || user.creditsUsedMonth >= user.creditLimitMonth) {
      return NextResponse.json(
        { error: "INSUFFICIENT_CREDITS", message: "You have no credits remaining this month" },
        { status: 402 }
      );
    }

    // Check for duplicate
    const existing = await prisma.referralRequest.findFirst({
      where: { seekerId: session.user.id, jobPostingId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "ALREADY_REQUESTED", message: "You have already requested a referral for this job" },
        { status: 409 }
      );
    }

    const job = await prisma.jobPosting.findUnique({ where: { id: jobPostingId } });
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    // Create request + deduct credits atomically
    const [request] = await prisma.$transaction([
      prisma.referralRequest.create({
        data: {
          pitch,
          seekerId: session.user.id,
          referrerId: job.referrerId,
          jobPostingId,
          creditCost: 1,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          creditsBalance: { decrement: 1 },
          creditsUsedMonth: { increment: 1 },
        },
      }),
    ]);

    return NextResponse.json({ data: { id: request.id, status: request.status } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};

  if (session.user.role === "SEEKER") {
    where.seekerId = session.user.id;
  } else {
    where.referrerId = session.user.id;
  }

  if (statusFilter && statusFilter !== "ALL") {
    where.status = statusFilter;
  }

  const requests = await prisma.referralRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      jobPosting: {
        select: {
          id: true,
          title: true,
          company: true,
          location: true,
          locationType: true,
        },
      },
      seeker: {
        select: { id: true, name: true, avatarUrl: true },
      },
      referrer: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });

  return NextResponse.json({ data: requests });
}
