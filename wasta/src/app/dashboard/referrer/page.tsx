import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { WastaLogo } from "@/components/WastaLogo";
import { Button } from "@/components/ui/Button";

export default async function ReferrerDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "REFERRER") redirect("/dashboard/seeker");

  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col items-center justify-center px-4">
      <WastaLogo size="lg" className="mb-6" />
      <h1 className="font-sora text-2xl font-semibold text-[var(--text-primary)] mb-2">
        Welcome, {session.user.name.split(" ")[0]}!
      </h1>
      <p className="text-[var(--text-secondary)] mb-6 text-center max-w-xs">
        The referrer dashboard is coming soon. For now, use the seeker flow to explore the platform.
      </p>
      <Button variant="primary" onClick={undefined}>
        <Link href="/login">Sign out</Link>
      </Button>
    </div>
  );
}
