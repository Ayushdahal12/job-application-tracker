import { Router } from "express";
import {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applications.js";

const router = Router();

router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);
router.patch("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
