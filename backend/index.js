import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";


dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
import authRoutes from "./src/routes/auth.routes.js";
app.use("/api/auth", authRoutes);
import bookRoutes from "./src/routes/book.routes.js";
app.use("/api/books", bookRoutes);
import adminRoutes from "./src/routes/admin.routes.js";
app.use("/api/admin", adminRoutes);

// DB Connect
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("KitabGhar Backend Running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
