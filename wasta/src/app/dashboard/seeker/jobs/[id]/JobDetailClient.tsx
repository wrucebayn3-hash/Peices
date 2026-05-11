"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreditBar } from "@/components/ui/CreditBar";
import { ReferralRequestModal } from "@/components/ReferralRequestModal";
import { formatSalary, timeAgo } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  locationType: "REMOTE" | "ONSITE" | "HYBRID";
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  description: string;
  requirements: string[];
  status: string;
  referrer: { id: string; name: string; headline: string | null; avatarUrl: string | null };
  existingRequest: {
    id: string;
    status: string;
    createdAt: string;
  } | null;
}

interface Props {
  job: Job;
  creditsBalance: number;
  creditLimitMonth: number;
  creditsUsedMonth: number;
}

const locationTypeLabel: Record<string, string> = {
  REMOTE: "Remote",
  ONSITE: "On-site",
  HYBRID: "Hybrid",
};

const locationTypeVariant: Record<string, "remote" | "onsite" | "hybrid"> = {
  REMOTE: "remote",
  ONSITE: "onsite",
  HYBRID: "hybrid",
};

export function JobDetailClient({ job, creditsBalance, creditLimitMonth, creditsUsedMonth }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [credits, setCredits] = useState(creditsBalance);
  const [usedMonth, setUsedMonth] = useState(creditsUsedMonth);
  const [localRequest, setLocalRequest] = useState(job.existingRequest);

  const salary = formatSalary(job.salaryMin, job.salaryMax, job.currency);
  const isExpired = job.status === "EXPIRED";
  const alreadyRequested = !!localRequest;
  const noCredits = credits === 0;

  const handleSuccess = () => {
    setCredits((c) => c - 1);
    setUsedMonth((u) => u + 1);
    setLocalRequest({
      id: "new",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-5">
        <Link href="/dashboard/seeker/jobs" className="hover:text-[var(--text-primary)] transition-colors">
          Browse Jobs
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[var(--text-primary)]">{job.title}</span>
      </nav>

      {isExpired && (
        <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 mb-5">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800">This posting is no longer active.</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column — job details */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <Avatar name={job.company} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-[var(--text-secondary)]">{job.company}</span>
                  <Badge variant="verified" className="text-[10px]">Verified</Badge>
                </div>
                <h1 className="font-sora text-2xl font-semibold text-[var(--text-primary)] leading-snug">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant={locationTypeVariant[job.locationType]}>
                    {locationTypeLabel[job.locationType]}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  {salary && (
                    <span className="text-sm font-medium text-[var(--text-primary)]">{salary}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About the role */}
          <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
            <h2 className="font-sora font-semibold text-[var(--text-primary)] mb-3">About the role</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
              <h2 className="font-sora font-semibold text-[var(--text-primary)] mb-3">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--teal)] mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right column — referral card */}
        {!isExpired && (
          <div className="lg:w-80 lg:shrink-0">
            <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden lg:sticky lg:top-20">
              {/* Navy top accent */}
              <div className="h-1 bg-[var(--navy)]" />
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide mb-2">
                    Get referred by
                  </p>
                  <div className="flex items-start gap-3">
                    <Avatar name={job.referrer.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-sm text-[var(--text-primary)]">
                          {job.referrer.name}
                        </span>
                        <Badge variant="verified" className="text-[10px]">Verified</Badge>
                      </div>
                      {job.referrer.headline && (
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                          {job.referrer.headline}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Credit info */}
                <div className="border-t border-[var(--border)] pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Cost</span>
                    <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                      <span className="text-[var(--gold)]">⬡</span> 1 credit
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Your balance</span>
                    <span className={`font-semibold ${credits === 0 ? "text-red-500" : "text-[var(--text-primary)]"}`}>
                      {credits} credit{credits !== 1 ? "s" : ""} remaining
                    </span>
                  </div>
                  <CreditBar
                    used={usedMonth}
                    limit={creditLimitMonth}
                    label="Monthly usage"
                  />
                </div>

                {/* CTA */}
                <div className="border-t border-[var(--border)] pt-3">
                  {alreadyRequested ? (
                    <div className="flex items-center gap-2 text-sm text-[var(--teal)]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <div>
                        <p className="font-medium">Request sent</p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {localRequest?.createdAt && timeAgo(localRequest.createdAt)}
                        </p>
                      </div>
                    </div>
                  ) : noCredits ? (
                    <div>
                      <Button variant="primary" size="lg" className="w-full" disabled>
                        Request referral — 1 credit
                      </Button>
                      <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> No credits remaining this month
                      </p>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => setModalOpen(true)}
                    >
                      Request referral — 1 credit
                    </Button>
                  )}

                  <p className="text-xs text-[var(--text-muted)] mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    The referrer will respond within 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ReferralRequestModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        job={job}
        referrerName={job.referrer.name}
        creditsBalance={credits}
        creditLimitMonth={creditLimitMonth}
        creditsUsedMonth={usedMonth}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
