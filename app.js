import express from "express";
import cors from "cors";
import { router as avatarGenRouter } from "./routers/avatarGen.router.js";
import { errorHandler } from "./errorHandling.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/avatargenerator", avatarGenRouter);
app.use(errorHandler)

app.listen(process.env.PORT || 3001);
