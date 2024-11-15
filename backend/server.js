import express from "express";
import { connectToMongoDb } from "./connectMongoDb/connectMongoDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import meetRoutes from "./routes/meet.routes.js";
import cors from "cors"; // Import CORS middleware
import adviceRoutes from "./routes/adviceRoutes.js";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();

const app = express();
const port = 3000;

// Use CORS middleware with credentials
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET,POST,PUT,DELETE", // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/meet", meetRoutes);
app.use('/api/advice', adviceRoutes);

// Start the server
app.listen(port, async () => {
  await connectToMongoDb();
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
