"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Briefcase, Search } from "lucide-react";
import { WastaLogo } from "@/components/WastaLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

type Role = "SEEKER" | "REFERRER";

const seekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const referrerSchema = seekerSchema.extend({
  company: z.string().min(1, "Company name is required"),
});

type ReferrerData = z.infer<typeof referrerSchema>;

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>("SEEKER");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const schema = role === "REFERRER" ? referrerSchema : seekerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferrerData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
  });

  const onSubmit = async (data: ReferrerData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role }),
      });

      const json = await res.json();
      if (!res.ok) {
        showToast(json.error || "Registration failed", "error");
        return;
      }

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        showToast("Account created but sign-in failed", "warning");
        router.push("/login");
        return;
      }

      showToast(`Welcome to Wasta, ${data.name.split(" ")[0]}! 🎉`, "success");
      router.push(role === "REFERRER" ? "/dashboard/referrer" : "/dashboard/seeker");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="flex justify-center mb-8">
            <WastaLogo size="lg" />
          </div>

          <div className="text-center mb-8">
            <h1 className="font-sora text-2xl font-semibold text-[var(--text-primary)] mb-2">
              How will you use Wasta?
            </h1>
            <p className="text-[var(--text-secondary)]">
              Choose your role to get started
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Seeker card */}
            <button
              onClick={() => { setRole("SEEKER"); setStep(2); }}
              className={cn(
                "bg-white border-2 rounded-[var(--radius-xl)] p-6 text-left transition-all hover:border-[var(--gold)] hover:shadow-md",
                role === "SEEKER" ? "border-[var(--gold)]" : "border-[var(--border)]"
              )}
            >
              <div className="h-12 w-12 rounded-[var(--radius-md)] bg-[var(--gold-light)] flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-[var(--gold-dark)]" />
              </div>
              <h2 className="font-sora font-semibold text-[var(--text-primary)] text-lg mb-1">
                Job Seeker
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Browse jobs and request referrals from insiders at top companies
              </p>
            </button>

            {/* Referrer card */}
            <button
              onClick={() => { setRole("REFERRER"); setStep(2); }}
              className={cn(
                "bg-white border-2 rounded-[var(--radius-xl)] p-6 text-left transition-all hover:border-[var(--navy)] hover:shadow-md",
                role === "REFERRER" ? "border-[var(--navy)]" : "border-[var(--border)]"
              )}
            >
              <div className="h-12 w-12 rounded-[var(--radius-md)] bg-[var(--teal-light)] flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-[var(--teal)]" />
              </div>
              <h2 className="font-sora font-semibold text-[var(--text-primary)] text-lg mb-1">
                Referrer
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Post open roles and refer talented candidates from your network
              </p>
            </button>
          </div>

          <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--navy)] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <WastaLogo size="lg" />
        </div>

        <div className="bg-white border border-[var(--border)] rounded-[var(--radius-xl)] p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← Back
            </button>
          </div>
          <h1 className="font-sora text-2xl font-semibold text-[var(--text-primary)] mb-1">
            Create your account
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            Joining as a <strong>{role === "SEEKER" ? "Job Seeker" : "Referrer"}</strong>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full name"
              placeholder="Ahmed Hassan"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            {role === "REFERRER" && (
              <Input
                label="Company"
                placeholder="Acme Corp"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                error={(errors as any).company?.message}
                {...register("company")}
              />
            )}
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Same as above"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Create account
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--navy)] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
