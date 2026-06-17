import express from "express";
import cors from "cors";
import applicationRoutes from "./routes/applications.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/applications", applicationRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Job Tracker API is running 🚀", status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
