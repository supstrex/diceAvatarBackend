import express from "express";
import { generate } from "../controllers/avatarGen.controller.js";

export const router = express.Router();

router.post("/", generate);
