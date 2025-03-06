import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

// GET results by course and batch
router.get("/", async (req, res) => {
  try {
    const { course, batch } = req.query;
    if (!course || !batch) {
      return res.status(400).json({ error: "Course and batch are required" });
    }
    const results = await Result.find({ course, batch });
    res.json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST new results (single object or array)
router.post("/", async (req, res) => {
  try {
    // Normalize input to always be an array
    const results = Array.isArray(req.body) ? req.body : [req.body];

    // Validate each result
    for (const result of results) {
      const { id, name, course, batch, grade } = result;
      if (!id || !name || !course || !batch || grade === undefined) {
        return res.status(400).json({ error: "All fields (id, name, course, batch, grade) are required for each result" });
      }
    }

    // Check for duplicate IDs
    const ids = results.map((r) => r.id);
    const existingResults = await Result.find({ id: { $in: ids } });
    if (existingResults.length > 0) {
      const duplicateIds = existingResults.map((r) => r.id);
      return res.status(400).json({ error: `Duplicate IDs found: ${duplicateIds.join(", ")}` });
    }

    // Insert all results
    const savedResults = await Result.insertMany(results);
    res.status(201).json(savedResults);
  } catch (error) {
    console.error("Error adding results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;