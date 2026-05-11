"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  Briefcase,
  FileText,
  MessageSquare,
  User,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { WastaLogo } from "@/components/WastaLogo";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/seeker", label: "Home", icon: Home, exact: true },
  { href: "/dashboard/seeker/jobs", label: "Browse Jobs", icon: Briefcase },
  { href: "/dashboard/seeker/applications", label: "My Applications", icon: FileText },
  { href: "/dashboard/seeker/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/seeker/profile", label: "Profile", icon: User },
];

function NavLink({
  href,
  label,
  icon: Icon,
  exact,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all",
        isActive
          ? "bg-[var(--navy)] text-white"
          : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
      {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />}
    </Link>
  );
}

export default function SeekerLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const pageTitle = navItems.find((n) =>
    n.exact ? pathname === n.href : pathname.startsWith(n.href)
  )?.label || "Dashboard";

  const credits = session?.user?.creditsBalance ?? 0;
  const name = session?.user?.name ?? "";

  return (
    <div className="min-h-screen bg-[var(--surface)] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-[var(--border)] h-screen sticky top-0 overflow-y-auto">
        <div className="p-5 border-b border-[var(--border)]">
          <WastaLogo size="md" />
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--border)] space-y-3">
          <div className="flex items-center gap-2">
            <CreditBadge credits={credits} />
            <Link
              href="/dashboard/seeker/upgrade"
              className="text-xs text-[var(--gold-dark)] font-medium hover:underline"
            >
              Get more
            </Link>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white border-b border-[var(--border)] px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-sora font-semibold text-[var(--text-primary)] text-lg">
            {pageTitle}
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <Bell className="h-4.5 w-4.5" />
            </button>
            <Avatar name={name} size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 page-enter pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[var(--border)] z-20 flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {navItems.slice(0, 5).map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-[var(--radius-md)] text-[10px] font-medium transition-colors",
                isActive ? "text-[var(--navy)]" : "text-[var(--text-muted)]"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-[var(--navy)]")} />
              {label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
