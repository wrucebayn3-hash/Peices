import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { JobDetailClient } from "./JobDetailClient";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const job = await prisma.jobPosting.findUnique({
    where: { id: params.id },
    include: {
      referrer: {
        select: { id: true, name: true, headline: true, avatarUrl: true },
      },
    },
  });

  if (!job) notFound();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      creditsBalance: true,
      creditLimitMonth: true,
      creditsUsedMonth: true,
    },
  });

  const existingRequest = await prisma.referralRequest.findFirst({
    where: { seekerId: session.user.id, jobPostingId: params.id },
    select: { id: true, status: true, createdAt: true },
  });

  const serialized = {
    ...job,
    createdAt: job.createdAt.toISOString(),
    expiresAt: job.expiresAt?.toISOString() ?? null,
    requirements: JSON.parse(job.requirements) as string[],
    existingRequest: existingRequest
      ? { ...existingRequest, createdAt: existingRequest.createdAt.toISOString() }
      : null,
  };

  return (
    <JobDetailClient
      job={serialized}
      creditsBalance={user?.creditsBalance ?? 0}
      creditLimitMonth={user?.creditLimitMonth ?? 5}
      creditsUsedMonth={user?.creditsUsedMonth ?? 0}
    />
  );
}
