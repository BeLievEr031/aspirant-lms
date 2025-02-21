import { Request, Response, NextFunction, Router } from "express"
import { createChapterValidation } from "../validator/chapter.validation";
import ChapterService from "../services/ChapterService";
import Chapter from "../model/ChapterModel";
import ChapterController from "../controller/ChapterController";
import { ChapterRequest, PaginationRequest } from "../types";
import { paginationValidation } from "../validator/pagination.validation";
import { idValidation } from "../validator/common.validation";

const chapterRouter = Router();
const chapterService = new ChapterService(Chapter);
const chapterController = new ChapterController(chapterService);

chapterRouter.post("/", createChapterValidation, (req: Request, res: Response, next: NextFunction) => chapterController.create(req as ChapterRequest, res, next))

chapterRouter.put("/:id", idValidation, createChapterValidation, (req: Request, res: Response, next: NextFunction) => chapterController.update(req as ChapterRequest, res, next))

chapterRouter.get("/", paginationValidation, (req: Request, res: Response, next: NextFunction) =>
    chapterController.getAll(req as PaginationRequest, res, next)
);

chapterRouter.get("/:id", idValidation, (req: Request, res: Response, next: NextFunction) => chapterController.getById(req, res, next));

chapterRouter.delete("/:id", idValidation, (req: Request, res: Response, next: NextFunction) => chapterController.delete(req, res, next));

export default chapterRouter;

