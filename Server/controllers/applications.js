import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /applications
export const getAllApplications = async (req, res) => {
  try {
    const { status, job_type, search, page = 1, limit = 6 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (status) where.status = status;
    if (job_type) where.job_type = job_type;
    if (search) {
      where.OR = [
        { company_name: { contains: search, mode: "insensitive" } },
        { job_title: { contains: search, mode: "insensitive" } },
      ];
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { applied_date: "desc" },
        skip,
        take: limitNum,
      }),
      prisma.application.count({ where }),
    ]);

    res.json({
      data: applications,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    console.error("getAllApplications error:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

// GET /applications/:id
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.findUnique({ where: { id } });
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ data: application });
  } catch (error) {
    console.error("getApplicationById error:", error);
    res.status(500).json({ error: "Failed to fetch application" });
  }
};

// POST /applications
export const createApplication = async (req, res) => {
  try {
    const { company_name, job_title, job_type, status, applied_date, notes } = req.body;

    if (!company_name || !job_title || !job_type || !applied_date) {
      return res.status(400).json({
        error: "Missing required fields: company_name, job_title, job_type, applied_date",
      });
    }

    const application = await prisma.application.create({
      data: {
        company_name,
        job_title,
        job_type,
        status: status || "Applied",
        applied_date: new Date(applied_date),
        notes: notes || null,
      },
    });

    res.status(201).json({ data: application, message: "Application created successfully" });
  } catch (error) {
    console.error("createApplication error:", error);
    res.status(500).json({ error: "Failed to create application" });
  }
};

// PATCH /applications/:id
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, job_title, job_type, status, applied_date, notes } = req.body;

    const existing = await prisma.application.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Application not found" });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(company_name && { company_name }),
        ...(job_title && { job_title }),
        ...(job_type && { job_type }),
        ...(status && { status }),
        ...(applied_date && { applied_date: new Date(applied_date) }),
        ...(notes !== undefined && { notes }),
      },
    });

    res.json({ data: updated, message: "Application updated successfully" });
  } catch (error) {
    console.error("updateApplication error:", error);
    res.status(500).json({ error: "Failed to update application" });
  }
};

// DELETE /applications/:id
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.application.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Application not found" });
    }

    await prisma.application.delete({ where: { id } });
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("deleteApplication error:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};