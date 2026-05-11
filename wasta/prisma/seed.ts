import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.referralRequest.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("demo123", 12);

  // Create referrers
  const sara = await prisma.user.create({
    data: {
      email: "sara@techcorp.com",
      name: "Sara Al-Rashid",
      password,
      role: "REFERRER",
      headline: "Senior Engineering Manager at TechCorp Dubai",
      creditsBalance: 10,
      creditLimitMonth: 10,
      planTier: "PRO",
    },
  });

  const james = await prisma.user.create({
    data: {
      email: "james@finlab.io",
      name: "James Okonkwo",
      password,
      role: "REFERRER",
      headline: "Head of Product at FinLab — ex-Stripe, ex-Revolut",
      creditsBalance: 10,
      creditLimitMonth: 10,
      planTier: "PRO",
    },
  });

  // Create seeker
  const ahmed = await prisma.user.create({
    data: {
      email: "ahmed@gmail.com",
      name: "Ahmed Hassan",
      password,
      role: "SEEKER",
      headline: "Full-stack engineer with 4 years experience",
      creditsBalance: 5,
      creditLimitMonth: 5,
      creditsUsedMonth: 0,
      planTier: "FREE",
    },
  });

  // Create 8 job postings
  const jobs = [
    {
      title: "Senior Product Manager",
      company: "TechCorp Dubai",
      location: "Dubai, UAE",
      locationType: "HYBRID" as const,
      salaryMin: 25000,
      salaryMax: 35000,
      description:
        "We're looking for a Senior Product Manager to lead our consumer fintech products. You'll work cross-functionally with engineering, design, and business stakeholders to ship products that delight millions of users across the MENA region.",
      requirements: JSON.stringify([
        "5+ years product management experience",
        "Experience in fintech or high-growth startup",
        "Strong analytical and data-driven approach",
        "Excellent stakeholder management skills",
        "MBA or equivalent experience preferred",
      ]),
      referrerId: sara.id,
    },
    {
      title: "Frontend Engineer",
      company: "TechCorp Dubai",
      location: "Dubai, UAE",
      locationType: "HYBRID" as const,
      salaryMin: 18000,
      salaryMax: 28000,
      description:
        "Join our frontend team to build the next generation of financial tools. You'll be working with React, TypeScript, and a modern design system to deliver pixel-perfect, accessible experiences.",
      requirements: JSON.stringify([
        "3+ years React/TypeScript experience",
        "Strong understanding of web performance",
        "Experience with design systems",
        "Familiarity with testing best practices",
        "Portfolio of shipped production work",
      ]),
      referrerId: sara.id,
    },
    {
      title: "UX Designer",
      company: "TechCorp Dubai",
      location: "Remote",
      locationType: "REMOTE" as const,
      salaryMin: 15000,
      salaryMax: 22000,
      description:
        "We need a talented UX Designer to define the user experience for our B2B dashboard products. You'll lead end-to-end design from research through delivery.",
      requirements: JSON.stringify([
        "4+ years UX/product design experience",
        "Proficiency in Figma",
        "Experience conducting user research",
        "Strong portfolio with B2B SaaS work",
        "Ability to work in a fast-paced environment",
      ]),
      referrerId: sara.id,
    },
    {
      title: "Data Analyst",
      company: "FinLab",
      location: "Abu Dhabi, UAE",
      locationType: "ONSITE" as const,
      salaryMin: 14000,
      salaryMax: 20000,
      description:
        "FinLab is hiring a Data Analyst to power our growth analytics function. You'll own our core dashboards and work directly with the executive team on strategic reporting.",
      requirements: JSON.stringify([
        "2+ years data analysis experience",
        "Proficiency in SQL and Python",
        "Experience with BI tools (Looker, Metabase, Tableau)",
        "Strong communication and storytelling skills",
        "Finance or banking domain knowledge a plus",
      ]),
      referrerId: james.id,
    },
    {
      title: "Backend Engineer",
      company: "FinLab",
      location: "Dubai, UAE",
      locationType: "HYBRID" as const,
      salaryMin: 20000,
      salaryMax: 30000,
      description:
        "We're scaling our payment infrastructure at FinLab and need a Backend Engineer who can build reliable, high-throughput APIs. You'll work with Go/Node.js on our core transaction platform.",
      requirements: JSON.stringify([
        "4+ years backend engineering experience",
        "Experience with Go, Node.js, or similar",
        "Solid understanding of distributed systems",
        "Experience with PostgreSQL and Redis",
        "Prior payments or fintech experience preferred",
      ]),
      referrerId: james.id,
    },
    {
      title: "Marketing Lead",
      company: "TechCorp Dubai",
      location: "Dubai, UAE",
      locationType: "ONSITE" as const,
      salaryMin: 18000,
      salaryMax: 25000,
      description:
        "Drive brand awareness and demand generation for TechCorp's suite of SMB tools across the MENA region. You'll own the full marketing funnel from acquisition through retention.",
      requirements: JSON.stringify([
        "5+ years B2B marketing experience",
        "Proven track record in SaaS growth",
        "Experience managing performance marketing budgets",
        "Strong content and copywriting skills",
        "Arabic language skills are a strong plus",
      ]),
      referrerId: sara.id,
    },
    {
      title: "Operations Manager",
      company: "FinLab",
      location: "Abu Dhabi, UAE",
      locationType: "ONSITE" as const,
      salaryMin: 16000,
      salaryMax: 22000,
      description:
        "Oversee day-to-day operations for FinLab's lending business. You'll manage vendor relationships, optimize processes, and work with compliance teams to ensure smooth operations.",
      requirements: JSON.stringify([
        "5+ years operations management experience",
        "Experience in financial services preferred",
        "Strong project management skills",
        "Proficiency with workflow automation tools",
        "Bachelor's degree in business or related field",
      ]),
      referrerId: james.id,
    },
    {
      title: "DevOps Engineer",
      company: "FinLab",
      location: "Remote",
      locationType: "REMOTE" as const,
      salaryMin: 22000,
      salaryMax: 32000,
      description:
        "Build and maintain the infrastructure that powers FinLab's products. You'll lead our cloud migration to AWS, implement GitOps workflows, and ensure 99.99% uptime for our payment platform.",
      requirements: JSON.stringify([
        "4+ years DevOps/Platform engineering experience",
        "Strong AWS or GCP experience",
        "Expertise in Kubernetes and Terraform",
        "Experience with CI/CD pipelines",
        "Security-first mindset",
      ]),
      referrerId: james.id,
    },
  ];

  for (const job of jobs) {
    await prisma.jobPosting.create({ data: job });
  }

  console.log(`✅ Created 2 referrers, 1 seeker, and ${jobs.length} job postings`);
  console.log("\nDemo accounts:");
  console.log("  Seeker:   ahmed@gmail.com / demo123");
  console.log("  Referrer: sara@techcorp.com / demo123");
  console.log("  Referrer: james@finlab.io / demo123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
