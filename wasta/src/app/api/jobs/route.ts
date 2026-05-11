import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const locationType = searchParams.get("locationType") || "";
  const sort = searchParams.get("sort") || "newest";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {
    status: "ACTIVE",
  };

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { company: { contains: search } },
      { location: { contains: search } },
    ];
  }

  if (locationType && locationType !== "ALL") {
    where.locationType = locationType;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderBy: any =
    sort === "salary"
      ? [{ salaryMax: "desc" }, { createdAt: "desc" }]
      : { createdAt: "desc" };

  const jobs = await prisma.jobPosting.findMany({
    where,
    orderBy,
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

  // Get seeker's existing requests for these jobs
  const existingRequests = await prisma.referralRequest.findMany({
    where: {
      seekerId: session.user.id,
      jobPostingId: { in: jobs.map((j) => j.id) },
    },
    select: { jobPostingId: true, status: true, createdAt: true },
  });

  const requestsByJob = Object.fromEntries(
    existingRequests.map((r) => [r.jobPostingId, r])
  );

  return NextResponse.json({
    data: jobs.map((job) => ({
      ...job,
      existingRequest: requestsByJob[job.id] || null,
    })),
  });
}
