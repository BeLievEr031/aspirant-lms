import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ChapterService from "../services/ChapterService";
import { HTTP_STATUS } from "../utils/constant";
import { ChapterRequest, PaginationRequest } from "../types";

class ChapterController {

    constructor(private chapterService: ChapterService) {
        this.chapterService = chapterService;
    }

    async create(req: ChapterRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const chapter = await this.chapterService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({ success: true, data: chapter, message: "Chapter created successfully." });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: PaginationRequest, res: Response, next: NextFunction) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const parentId = req.query.parentId!;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const result = await this.chapterService.getAll(parentId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Chapter fetched.",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const chapter = await this.chapterService.getById(req.params.id);
            if (!chapter) {
                res.status(404).json({ message: "Chapter not found" });
                return
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: chapter });
        } catch (error) {
            next(error);
        }
    }

    async update(req: ChapterRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const updatedChapter = await this.chapterService.update(req.params.id, req.body);
            if (!updatedChapter) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Chapter not found" })
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: updatedChapter, message: "Chapter updated successfully." });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const deletedChapter = await this.chapterService.delete(req.params.id);
            if (!deletedChapter) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Chapter not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Chapter deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default ChapterController;
