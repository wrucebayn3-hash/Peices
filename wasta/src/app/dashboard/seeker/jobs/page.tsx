import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { JobsBrowser } from "./JobsBrowser";

export default async function BrowseJobsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { creditsBalance: true, creditLimitMonth: true, creditsUsedMonth: true },
  });

  const jobs = await prisma.jobPosting.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    include: {
      referrer: {
        select: { id: true, name: true },
      },
    },
  });

  const existingRequests = await prisma.referralRequest.findMany({
    where: {
      seekerId: session.user.id,
      jobPostingId: { in: jobs.map((j) => j.id) },
    },
    select: { jobPostingId: true, createdAt: true },
  });

  const requestedJobIds = new Set(existingRequests.map((r) => r.jobPostingId));

  const serialized = jobs.map((job) => ({
    ...job,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    createdAt: job.createdAt.toISOString(),
    expiresAt: job.expiresAt?.toISOString() ?? null,
    alreadyRequested: requestedJobIds.has(job.id),
  }));

  return (
    <JobsBrowser
      jobs={serialized}
      creditsBalance={user?.creditsBalance ?? 0}
    />
  );
}
