"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { CreditBar } from "@/components/ui/CreditBar";
import { Avatar } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { cn, formatSalary } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  company: string;
  locationType: "REMOTE" | "ONSITE" | "HYBRID";
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string;
}

interface ReferralRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  referrerName: string;
  creditsBalance: number;
  creditLimitMonth: number;
  creditsUsedMonth: number;
  onSuccess: () => void;
}

type Step = 1 | 2 | 3;

const PITCH_MIN = 20;
const PITCH_MAX = 280;
const PITCH_WARN = 260;

export function ReferralRequestModal({
  open,
  onOpenChange,
  job,
  referrerName,
  creditsBalance,
  creditLimitMonth,
  creditsUsedMonth,
  onSuccess,
}: ReferralRequestModalProps) {
  const { update: updateSession } = useSession();
  const { showToast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setPitch("");
        setLoading(false);
      }, 300);
    }
    onOpenChange(open);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/referral-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPostingId: job.id, pitch }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "INSUFFICIENT_CREDITS") {
          showToast("You have no credits remaining this month.", "error");
        } else if (data.error === "ALREADY_REQUESTED") {
          showToast("You already submitted a request for this job.", "warning");
        } else {
          showToast("Something went wrong. Please try again.", "error");
        }
        return;
      }

      // Update session credits
      await updateSession({
        creditsBalance: creditsBalance - 1,
        creditsUsedMonth: creditsUsedMonth + 1,
      });

      onSuccess();
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const salary = formatSalary(job.salaryMin, job.salaryMax, job.currency);
  const firstName = referrerName.split(" ")[0];
  const pitchLen = pitch.length;
  const isOverWarn = pitchLen >= PITCH_WARN;

  return (
    <Modal open={open} onOpenChange={handleClose} showClose={step !== 3}>
      {step === 1 && (
        <div className="space-y-4">
          <div className="mb-1">
            <h2 className="font-sora text-lg font-semibold text-[var(--text-primary)]">
              Tell {firstName} why you&apos;re a great fit
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              A strong, personal pitch gets faster responses
            </p>
          </div>

          <div className="relative">
            <Textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value.slice(0, PITCH_MAX))}
              placeholder={`Hi ${firstName}, I'm very excited about the ${job.title} role at ${job.company}. I believe I'd be a great fit because...`}
              className="min-h-[140px] resize-none"
            />
            <span
              className={cn(
                "absolute bottom-2.5 right-3 text-xs",
                isOverWarn ? "text-red-500 font-medium" : "text-[var(--text-muted)]"
              )}
            >
              {pitchLen}/{PITCH_MAX}
            </span>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={pitchLen < PITCH_MIN}
            onClick={() => setStep(2)}
          >
            Next →
          </Button>
          {pitchLen < PITCH_MIN && (
            <p className="text-xs text-center text-[var(--text-muted)]">
              Write at least {PITCH_MIN - pitchLen} more characters
            </p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h2 className="font-sora text-lg font-semibold text-[var(--text-primary)]">
              Confirm your request
            </h2>
          </div>

          {/* Job summary */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-3">
            <div className="flex items-center gap-2.5">
              <Avatar name={job.company} size="sm" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{job.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {job.company}
                  {salary && ` · ${salary}`}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 italic">&ldquo;{pitch}&rdquo;</p>
            </div>
          </div>

          {/* Credit breakdown */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Cost</span>
              <span className="font-medium text-[var(--text-primary)]">1 credit</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Balance after</span>
              <span className="font-medium text-[var(--navy)]">{creditsBalance - 1} credits</span>
            </div>
            <CreditBar
              used={creditsUsedMonth + 1}
              limit={creditLimitMonth}
              label="After this request"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="ghost" size="lg" className="flex-1" onClick={() => setStep(1)}>
              Go back
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              loading={loading}
              onClick={handleConfirm}
            >
              Confirm & send — 1 credit
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-4 space-y-4">
          {/* Animated checkmark */}
          <div className="flex justify-center">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="34" stroke="var(--teal-light)" strokeWidth="3" fill="var(--teal-light)" />
              <path
                d="M22 36L31 45L50 27"
                stroke="var(--teal)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-draw"
              />
            </svg>
          </div>

          <div>
            <h2 className="font-sora text-xl font-semibold text-[var(--text-primary)]">
              Request sent!
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xs mx-auto">
              {firstName} will respond within 48 hours. We&apos;ll notify you by email when they do.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => {
                handleClose(false);
                window.location.href = "/dashboard/seeker/applications";
              }}
            >
              View my applications
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="w-full"
              onClick={() => handleClose(false)}
            >
              Browse more jobs
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
