import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CreditBar } from "@/components/ui/CreditBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { JobCard } from "@/components/ui/JobCard";
import { timeAgo } from "@/lib/utils";

const statusVariant: Record<string, "active" | "pending" | "declined" | "expired"> = {
  ACCEPTED: "active",
  PENDING: "pending",
  DECLINED: "declined",
};

export default async function SeekerHomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  const remaining = user.creditLimitMonth - user.creditsUsedMonth;

  const recentRequests = await prisma.referralRequest.findMany({
    where: { seekerId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      jobPosting: { select: { title: true, company: true } },
      referrer: { select: { name: true } },
    },
  });

  const stats = await prisma.$transaction([
    prisma.referralRequest.count({ where: { seekerId: user.id, status: "PENDING" } }),
    prisma.referralRequest.count({ where: { seekerId: user.id, status: "ACCEPTED" } }),
    prisma.referralRequest.count({ where: { seekerId: user.id } }),
  ]);

  const recommendedJobs = await prisma.jobPosting.findMany({
    where: { status: "ACTIVE" },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      referrer: { select: { id: true, name: true } },
    },
  });

  const existingRequests = await prisma.referralRequest.findMany({
    where: { seekerId: user.id, jobPostingId: { in: recommendedJobs.map((j) => j.id) } },
    select: { jobPostingId: true },
  });

  const requestedJobIds = new Set(existingRequests.map((r) => r.jobPostingId));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = user.name.split(" ")[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="font-sora text-2xl font-semibold text-[var(--text-primary)]">
          {greeting}, {firstName}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          You have <strong>{remaining}</strong> referral request{remaining !== 1 ? "s" : ""} remaining this month
        </p>
      </div>

      {/* Credits card */}
      <div className="bg-[var(--gold-light)] border border-[var(--gold)]/30 rounded-[var(--radius-lg)] p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-sora font-semibold text-[var(--text-primary)]">Credits this month</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Free plan • {remaining} of {user.creditLimitMonth} remaining
            </p>
          </div>
          <div className="h-16 w-16 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#E2DDD5" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9155" fill="none"
                stroke="var(--gold)" strokeWidth="3"
                strokeDasharray={`${(user.creditsUsedMonth / user.creditLimitMonth) * 100} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                {user.creditsUsedMonth}/{user.creditLimitMonth}
              </span>
            </div>
          </div>
        </div>
        <CreditBar used={user.creditsUsedMonth} limit={user.creditLimitMonth} label="Monthly usage" />
        <div className="mt-3">
          <Button size="sm" variant="secondary">
            Upgrade plan
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active requests", value: stats[0], color: "text-amber-600" },
          { label: "Accepted", value: stats[1], color: "text-[var(--teal)]" },
          { label: "Total sent", value: stats[2], color: "text-[var(--navy)]" },
        ].map((stat) => (
          <Card key={stat.label} className="text-center p-4">
            <p className={`font-sora text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      {recentRequests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-sora font-semibold text-[var(--text-primary)]">Recent activity</h3>
            <Link
              href="/dashboard/seeker/applications"
              className="text-xs text-[var(--navy)] font-medium hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={req.jobPosting.company} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {req.jobPosting.title}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {req.jobPosting.company} · via {req.referrer.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={statusVariant[req.status] || "pending"}>
                    {req.status.charAt(0) + req.status.slice(1).toLowerCase()}
                  </Badge>
                  <span className="text-xs text-[var(--text-muted)]">{timeAgo(req.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended jobs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-sora font-semibold text-[var(--text-primary)]">Recommended for you</h3>
          <Link
            href="/dashboard/seeker/jobs"
            className="text-xs text-[var(--navy)] font-medium hover:underline flex items-center gap-1"
          >
            Browse all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {recommendedJobs.map((job) => (
            <Link key={job.id} href={`/dashboard/seeker/jobs/${job.id}`}>
              <JobCard
                title={job.title}
                company={job.company}
                location={job.location}
                locationType={job.locationType}
                salaryMin={job.salaryMin}
                salaryMax={job.salaryMax}
                currency={job.currency}
                referrerName={job.referrer.name}
                disabled={user.creditsBalance === 0}
                alreadyRequested={requestedJobIds.has(job.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
