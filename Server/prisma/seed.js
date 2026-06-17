import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.application.deleteMany();

  const applications = [
    {
      company_name: "Google",
      job_title: "Software Engineer Intern",
      job_type: "Internship",
      status: "Interviewing",
      applied_date: new Date("2025-05-10"),
      notes: "Passed OA round, waiting for technical interview schedule.",
    },
    {
      company_name: "Stripe",
      job_title: "Frontend Engineer",
      job_type: "FullTime",
      status: "Applied",
      applied_date: new Date("2025-05-18"),
      notes: "Applied via referral from LinkedIn connection.",
    },
    {
      company_name: "Vercel",
      job_title: "Developer Advocate Intern",
      job_type: "Internship",
      status: "Offer",
      applied_date: new Date("2025-04-25"),
      notes: "Offer received! Reviewing compensation package.",
    },
    {
      company_name: "Meta",
      job_title: "Full Stack Engineer",
      job_type: "FullTime",
      status: "Rejected",
      applied_date: new Date("2025-04-15"),
      notes: "Got rejected after final round. Will retry next cycle.",
    },
    {
      company_name: "Notion",
      job_title: "Product Engineer",
      job_type: "FullTime",
      status: "Applied",
      applied_date: new Date("2025-05-22"),
      notes: "",
    },
    {
      company_name: "Linear",
      job_title: "Backend Engineer Intern",
      job_type: "Internship",
      status: "Interviewing",
      applied_date: new Date("2025-05-08"),
      notes: "Had first-round call with hiring manager. Went well.",
    },
  ];

  for (const app of applications) {
    await prisma.application.create({ data: app });
  }

  console.log(`✅ Seeded ${applications.length} applications.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
