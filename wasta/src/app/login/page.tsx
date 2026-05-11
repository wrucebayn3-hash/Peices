"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { WastaLogo } from "@/components/WastaLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        showToast("Invalid email or password. Please try again.", "error");
        return;
      }

      // Fetch session to get role
      const res = await fetch("/api/users/me");
      const json = await res.json();
      const role = json.data?.role;

      if (role === "REFERRER") {
        router.push("/dashboard/referrer");
      } else {
        router.push("/dashboard/seeker");
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <WastaLogo size="lg" />
        </div>

        <div className="bg-white border border-[var(--border)] rounded-[var(--radius-xl)] p-8 shadow-sm">
          <h1 className="font-sora text-2xl font-semibold text-[var(--text-primary)] mb-1">
            Welcome back
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            Sign in to your Wasta account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--navy)] font-medium hover:underline"
            >
              Create one
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Demo: ahmed@gmail.com / demo123
        </p>
      </div>
    </div>
  );
}
