import express, { type Request, type Response } from "express";
import userRouter from "./routes/user/userRoute.ts";
import cookieParser from "cookie-parser";
// Create new express app
const app = express();

// Middleware to parse request as json
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

//Auth route
app.use("/auth", userRouter);

export default app;
