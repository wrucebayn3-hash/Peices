import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const job = await prisma.jobPosting.findUnique({
    where: { id: params.id },
    include: {
      referrer: {
        select: {
          id: true,
          name: true,
          headline: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const existingRequest = await prisma.referralRequest.findFirst({
    where: {
      seekerId: session.user.id,
      jobPostingId: params.id,
    },
    select: { id: true, status: true, createdAt: true },
  });

  return NextResponse.json({ data: { ...job, existingRequest } });
}
