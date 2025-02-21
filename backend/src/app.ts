import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import Config from "./config/Config";
import { HttpError } from "http-errors";
import cookieParser from "cookie-parser"
import examCategoryRouter from "./routes/exam.category.route";
import subjectRouter from "./routes/subject.route";
import chapterRouter from "./routes/chapter.route";
import resourceRouter from "./routes/resource.route";
import studyPlanRouter from "./routes/studyplan.route";
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cookieParser())

app.use("/api/v1/exam-category", examCategoryRouter)
app.use("/api/v1/subject", subjectRouter)
app.use("/api/v1/chapter", chapterRouter)
app.use("/api/v1/resource", resourceRouter)
app.use("/api/v1/study-plan", studyPlanRouter)

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        errors: [
            {
                statusCode,
                type: err.name,
                msg: err.message,
                url: req.url,
                ip: req.ip,
                success: false,
                stack: Config.NODE_ENV === 'production' ? null : err.stack,
            },
        ],
    });
});

export default app;