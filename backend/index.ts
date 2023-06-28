import path from "path";
import dotenv from "dotenv";
import express, { Application } from "express";

// Load env vars
dotenv.config();

import { connectDB } from "./config/db";
import userRoutes from "./routes/Auth.routes";
import recipeRoutes from "./routes/Recipe.routes";
import categoryRoutes from "./routes/Category.routes";
import uploadRoutes from "./routes/Upload.routes";

import { errorHandler, notFound } from "./middlewares/errorHandler";

// Initialize express
const app: Application = express();

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
  });
});

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Make uploads folder static
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // for any route that is not api, redirect to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Welcome route
  app.get("/", (req, res) => {
    res.json({
      message: "API is running...",
    });
  });
}

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// Start server
try {
  app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT} 🚀`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: (${error.name}: ${error.message})`);
  }
}
