"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, AlertTriangle, ChevronDown } from "lucide-react";
import { JobCard } from "@/components/ui/JobCard";
import { ReferralRequestModal } from "@/components/ReferralRequestModal";
import { cn } from "@/lib/utils";

type LocationType = "ALL" | "REMOTE" | "ONSITE" | "HYBRID";
type SortOption = "newest" | "salary";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  locationType: "REMOTE" | "ONSITE" | "HYBRID";
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  referrer: { id: string; name: string };
  alreadyRequested: boolean;
  createdAt: string;
}

interface JobsBrowserProps {
  jobs: Job[];
  creditsBalance: number;
}

const locationFilters: { label: string; value: LocationType }[] = [
  { label: "All", value: "ALL" },
  { label: "Remote", value: "REMOTE" },
  { label: "On-site", value: "ONSITE" },
  { label: "Hybrid", value: "HYBRID" },
];

export function JobsBrowser({ jobs, creditsBalance }: JobsBrowserProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [locationType, setLocationType] = useState<LocationType>("ALL");
  const [sort, setSort] = useState<SortOption>("newest");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestedJobs, setRequestedJobs] = useState<Set<string>>(
    new Set(jobs.filter((j) => j.alreadyRequested).map((j) => j.id))
  );
  const [credits, setCredits] = useState(creditsBalance);

  const filtered = useMemo(() => {
    let result = jobs.filter((job) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.company.toLowerCase().includes(q) &&
          !job.location.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (locationType !== "ALL" && job.locationType !== locationType) return false;
      return true;
    });

    if (sort === "salary") {
      result = [...result].sort((a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0));
    }

    return result;
  }, [jobs, search, locationType, sort]);

  const handleRequestReferral = (job: Job) => {
    if (credits === 0) return;
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleSuccess = (jobId: string) => {
    setRequestedJobs((prev) => { const next = new Set(Array.from(prev)); next.add(jobId); return next; });
    setCredits((prev) => prev - 1);
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Credits-empty banner */}
      {credits === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 mb-5">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">No credits remaining</p>
            <p className="text-xs text-amber-700">Upgrade your plan to send more referral requests this month.</p>
          </div>
          <button className="text-xs font-semibold text-amber-700 border border-amber-300 px-3 py-1.5 rounded-md hover:bg-amber-100 transition-colors whitespace-nowrap">
            Upgrade
          </button>
        </div>
      )}

      {/* Search + filters */}
      <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-4 mb-4 sticky top-16 z-10 shadow-sm">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search jobs, companies, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-[var(--radius-md)] border border-[var(--border)] text-sm bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-colors"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {locationFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setLocationType(f.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  locationType === f.value
                    ? "bg-[var(--navy)] text-white"
                    : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none pl-3 pr-7 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] text-[var(--text-secondary)]"
            >
              <option value="newest">Newest</option>
              <option value="salary">Highest salary</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--text-secondary)] mb-3">
        Showing <strong>{filtered.length}</strong> job{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Jobs list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No jobs found</p>
            <p className="text-sm mt-1">Try different filters or search terms</p>
          </div>
        ) : (
          filtered.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              locationType={job.locationType}
              salaryMin={job.salaryMin}
              salaryMax={job.salaryMax}
              currency={job.currency}
              referrerName={job.referrer.name}
              disabled={credits === 0}
              alreadyRequested={requestedJobs.has(job.id)}
              onClick={() => router.push(`/dashboard/seeker/jobs/${job.id}`)}
              onRequestReferral={() => handleRequestReferral(job)}
            />
          ))
        )}
      </div>

      {selectedJob && (
        <ReferralRequestModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          job={selectedJob}
          referrerName={selectedJob.referrer.name}
          creditsBalance={credits}
          creditLimitMonth={5}
          creditsUsedMonth={5 - credits}
          onSuccess={() => handleSuccess(selectedJob.id)}
        />
      )}
    </div>
  );
}

// need this for the empty state
function Briefcase({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}
