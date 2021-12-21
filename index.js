import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();