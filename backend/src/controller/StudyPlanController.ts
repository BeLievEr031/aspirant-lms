import { validationResult } from "express-validator";
import StudyPlanService from "../services/StudyPlanService";
import { HTTP_STATUS } from "../utils/constant";
import { Request, NextFunction, Response } from "express";
import { ExamCategoryRequest, PaginationRequest, StudyPlanRequest } from "../types";

class StudyPlanController {
    constructor(private studyPlanService: StudyPlanService) {
        this.studyPlanService = studyPlanService;
    }

    async createExamCategory(req: ExamCategoryRequest, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: result.array() });
                return;
            }

            const examCategory = await this.studyPlanService.createExamCategory(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: examCategory,
                message: "Exam Category created."
            });

        } catch (error) {
            next(error);
        }
    }


    async create(req: StudyPlanRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const studyPlan = await this.studyPlanService.create(req.body);
            res.status(201).json({ success: true, data: studyPlan, message: "Study Plan created successfully." });
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

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const result = await this.studyPlanService.getAll(page, limit, sortBy, order);
            res.status(200).json(result);
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

            const studyPlan = await this.studyPlanService.getById(req.params.id);
            if (!studyPlan) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Study Plan not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: studyPlan });
        } catch (error) {
            next(error);
        }
    }

    async update(req: StudyPlanRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const updatedStudyPlan = await this.studyPlanService.update(req.params.id, req.body);
            if (!updatedStudyPlan) {
                res.status(404).json({ message: "Study Plan not found" });
                return;
            }

            res.status(200).json({ success: true, data: updatedStudyPlan, message: "Study Plan updated successfully." });
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

            const deletedStudyPlan = await this.studyPlanService.delete(req.params.id);
            if (!deletedStudyPlan) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Study Plan not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Study Plan deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}


export default StudyPlanController;