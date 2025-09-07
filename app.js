import express from "express";
import dotenv from "dotenv";
import websiteRoutes from "./routes/websiteRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config(); // load .env

const app = express(); // create express app
const PORT = process.env.PORT || 5000;

// Root route for welcome message
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to MetaFetchR 🔍</h1>
    <p>
    Metafetchr is a backend API built with Express.js, Supabase, and Arcjet for scraping and storing website metadata.
    </p>
    <a href="https://github.com/shayaan-git/MetaFetchR?tab=readme-ov-file#5--testing" target="blank">API Testing Guide</a> `);
});

// trust Render’s proxy headers in Express so req.ip resolves correctly for Arcjet
app.set("trust proxy", true);

app.use(express.json()); // parsing JSON bodies

//Routes
app.use("/api/websites", websiteRoutes); // CRUD Routes
app.use("/api/analyze", rateLimiter, analyzeRoutes);

// route not found handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

// Star Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;
