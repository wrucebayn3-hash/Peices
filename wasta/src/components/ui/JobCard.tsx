"use client";

import { cn, formatSalary } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  locationType: "REMOTE" | "ONSITE" | "HYBRID";
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string;
  referrerName: string;
  onRequestReferral?: () => void;
  disabled?: boolean;
  alreadyRequested?: boolean;
  className?: string;
  onClick?: () => void;
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

export function JobCard({
  title,
  company,
  location,
  locationType,
  salaryMin,
  salaryMax,
  currency = "AED",
  referrerName,
  onRequestReferral,
  disabled,
  alreadyRequested,
  className,
  onClick,
}: JobCardProps) {
  const salary = formatSalary(salaryMin, salaryMax, currency);

  return (
    <div
      className={cn(
        "bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-5",
        "transition-all duration-150 hover:border-[var(--gold)] hover:shadow-md hover:-translate-y-0.5",
        "cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Avatar name={company} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-sora font-semibold text-[var(--text-primary)] text-sm leading-snug group-hover:text-[var(--navy)] truncate">
            {title}
          </h3>
          <p className="text-[var(--text-secondary)] text-xs mt-0.5">{company}</p>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <Badge variant={locationTypeVariant[locationType]}>
              {locationTypeLabel[locationType]}
            </Badge>
            <span className="flex items-center gap-0.5 text-xs text-[var(--text-secondary)]">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
            {salary && (
              <span className="text-xs text-[var(--text-secondary)] font-medium">
                {salary}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-1.5">
              <Avatar name={referrerName} size="sm" />
              <div className="flex items-center gap-1">
                <span className="text-xs text-[var(--text-secondary)]">{referrerName}</span>
                <Badge variant="verified" className="text-[10px] px-1.5 py-0">Verified</Badge>
              </div>
            </div>

            <Button
              size="sm"
              variant={alreadyRequested ? "ghost" : "primary"}
              disabled={disabled || alreadyRequested}
              onClick={(e) => {
                e.stopPropagation();
                onRequestReferral?.();
              }}
              className="shrink-0"
            >
              {alreadyRequested ? "Request sent" : "Request referral"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
