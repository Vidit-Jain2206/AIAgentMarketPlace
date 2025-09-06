import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v1Router } from "./routes/index.js";
dotenv.config();

export const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to handle CORS
app.use(cors());

app.use("/api", v1Router);
