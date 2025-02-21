import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ExamCategoryRequest, PaginationRequest } from "../types";
import ExamService from "../services/ExamService";
import { HTTP_STATUS } from "../utils/constant";

class ExamController {
    constructor(private examService: ExamService) {
        this.examService = examService
    }

    // Create Exam Category
    async create(req: ExamCategoryRequest, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: result.array() });
                return;
            }

            const examCategory = await this.examService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: examCategory,
                message: "Exam Category created."
            });

        } catch (error) {
            next(error);
        }
    }

    // Get All Exam Categories
    async getAll(req: PaginationRequest, res: Response, next: NextFunction) {
        try {

            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: result.array() });
                return;
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";
            const belong = req.query.belong!;
            const examCategories = await this.examService.getAll(page, limit, sortBy, order, belong);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: examCategories
            });
        } catch (error) {
            next(error);
        }
    }

    // Get Exam Category by ID
    async getById(req: ExamCategoryRequest, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: result.array() });
                return;
            }

            const { id } = req.params;
            const examCategory = await this.examService.getById(id);
            if (!examCategory) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Exam Category not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: examCategory
            });

        } catch (error) {
            next(error);
        }
    }

    async update(req: ExamCategoryRequest, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: result.array() });
                return;
            }

            const { id } = req.params;

            const updatedExamCategory = await this.examService.update(id, req.body);
            if (!updatedExamCategory) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Exam Category not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedExamCategory,
                message: "Exam Category updated successfully"
            });

        } catch (error) {
            next(error);
        }
    }

    // Delete Exam Category
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: result.array() });
                return;
            }
            const { id } = req.params;
            const deletedExamCategory = await this.examService.delete(id);
            if (!deletedExamCategory) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Exam Category not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Exam Category deleted successfully"
            });

        } catch (error) {
            next(error);
        }
    }
}

export default ExamController;
