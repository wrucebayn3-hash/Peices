import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { CreditBadge } from "@/components/ui/CreditBadge";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { name, email, creditsBalance, planTier } = session.user;

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
        <div className="flex items-center gap-4">
          <Avatar name={name} size="lg" />
          <div>
            <h2 className="font-sora font-semibold text-[var(--text-primary)] text-lg">{name}</h2>
            <p className="text-sm text-[var(--text-secondary)]">{email}</p>
            <div className="flex items-center gap-2 mt-2">
              <CreditBadge credits={creditsBalance} />
              <Badge variant={planTier === "FREE" ? "expired" : "verified"}>
                {planTier} plan
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
