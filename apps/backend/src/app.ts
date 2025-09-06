import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiRoutes } from "./routes/api/index.js";
dotenv.config();

export const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to handle CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.use("/api", apiRoutes);
