import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          creditsBalance: user.creditsBalance,
          creditLimitMonth: user.creditLimitMonth,
          creditsUsedMonth: user.creditsUsedMonth,
          planTier: user.planTier,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.creditsBalance = user.creditsBalance;
        token.creditLimitMonth = user.creditLimitMonth;
        token.creditsUsedMonth = user.creditsUsedMonth;
        token.planTier = user.planTier;
      }

      if (trigger === "update" && session) {
        token.creditsBalance = session.creditsBalance ?? token.creditsBalance;
        token.creditsUsedMonth = session.creditsUsedMonth ?? token.creditsUsedMonth;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.creditsBalance = token.creditsBalance;
      session.user.creditLimitMonth = token.creditLimitMonth;
      session.user.creditsUsedMonth = token.creditsUsedMonth;
      session.user.planTier = token.planTier;
      return session;
    },
  },
};
