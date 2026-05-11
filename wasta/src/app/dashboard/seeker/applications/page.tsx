"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreditBar } from "@/components/ui/CreditBar";
import { useSession } from "next-auth/react";
import { timeAgo } from "@/lib/utils";
import { JobCardSkeleton } from "@/components/ui/LoadingSkeleton";

type TabFilter = "ALL" | "PENDING" | "ACCEPTED" | "DECLINED";

const statusVariant: Record<string, "active" | "pending" | "declined" | "expired"> = {
  ACCEPTED: "active",
  PENDING: "pending",
  DECLINED: "declined",
};

const tabs: { label: string; value: TabFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Declined", value: "DECLINED" },
];

interface Request {
  id: string;
  status: string;
  createdAt: string;
  jobPosting: { id: string; title: string; company: string; location: string; locationType: string };
  referrer: { id: string; name: string; avatarUrl: string | null };
}

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabFilter>("ALL");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/referral-requests")
      .then((r) => r.json())
      .then((data) => {
        setRequests(data.data || []);
        setLoading(false);
      });
  }, []);

  const filtered =
    activeTab === "ALL" ? requests : requests.filter((r) => r.status === activeTab);

  const credits = session?.user?.creditsBalance ?? 0;
  const creditLimit = session?.user?.creditLimitMonth ?? 5;
  const creditsUsed = session?.user?.creditsUsedMonth ?? 0;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Credit bar */}
      <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
        <CreditBar
          used={creditsUsed}
          limit={creditLimit}
          label="Monthly referral credits"
        />
        <p className="text-xs text-[var(--text-secondary)] mt-1.5">
          {credits} credit{credits !== 1 ? "s" : ""} remaining this month
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1.5 bg-[var(--surface-2)] p-1 rounded-[var(--radius-md)]">
        {tabs.map((tab) => {
          const count = tab.value === "ALL"
            ? requests.length
            : requests.filter((r) => r.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 px-3 py-2 rounded-[calc(var(--radius-md)-2px)] text-sm font-medium transition-all ${
                activeTab === tab.value
                  ? "bg-white text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.value
                    ? "bg-[var(--surface-2)] text-[var(--text-secondary)]"
                    : "bg-[var(--border)] text-[var(--text-muted)]"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Request list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <JobCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="font-medium">No {activeTab !== "ALL" ? activeTab.toLowerCase() : ""} requests</p>
          <p className="text-sm mt-1">
            {activeTab === "ALL"
              ? "Browse jobs to start requesting referrals"
              : `No ${activeTab.toLowerCase()} requests yet`}
          </p>
          {activeTab === "ALL" && (
            <Link href="/dashboard/seeker/jobs">
              <Button variant="primary" size="sm" className="mt-4">
                Browse Jobs
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <Avatar name={req.jobPosting.company} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {req.jobPosting.title}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {req.jobPosting.company}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <Badge variant={statusVariant[req.status] || "pending"}>
                        {req.status.charAt(0) + req.status.slice(1).toLowerCase()}
                      </Badge>
                      <span className="text-xs text-[var(--text-muted)]">
                        via {req.referrer.name}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">·</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {timeAgo(req.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {req.status === "ACCEPTED" && (
                  <Link href={`/dashboard/seeker/messages/${req.id}`}>
                    <Button size="sm" variant="secondary" className="shrink-0">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Open chat
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
