import request from "supertest";
import express from "express";
import { PrismaClient } from "@prisma/client";
import applicationRoutes from "../routes/applications.js";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use("/applications", applicationRoutes);

let testId;

// Before test — create a real application in DB
beforeAll(async () => {
  const created = await prisma.application.create({
    data: {
      company_name: "Test Company",
      job_title: "Test Engineer",
      job_type: "Internship",
      status: "Applied",
      applied_date: new Date("2025-01-01"),
      notes: "This is a test entry",
    },
  });
  testId = created.id;
});

// After all tests — clean up just in case
afterAll(async () => {
  await prisma.application.deleteMany({
    where: { company_name: "Test Company" },
  });
  await prisma.$disconnect();
});

// MAIN TEST — delete works and record is gone from DB
test("DELETE /applications/:id removes the application from the database", async () => {
  // Step 1 — delete via API
  const res = await request(app).delete(`/applications/${testId}`);

  // Step 2 — API returns success
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Application deleted successfully");

  // Step 3 — confirm gone from DB
  const deleted = await prisma.application.findUnique({
    where: { id: testId },
  });
  expect(deleted).toBeNull();
});

// BONUS TEST — wrong ID returns 404
test("DELETE /applications/:id returns 404 for non-existent id", async () => {
  const res = await request(app).delete("/applications/non-existent-id-999");
  expect(res.status).toBe(404);
  expect(res.body.error).toBe("Application not found");
});