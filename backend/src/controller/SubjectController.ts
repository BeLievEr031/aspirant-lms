import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import SubjectService from "../services/SubjectService";
import { PaginationRequest, SubjectRequest } from "../types";
import { HTTP_STATUS } from "../utils/constant";

class SubjectController {
    constructor(private subjectService: SubjectService) {
        this.subjectService = subjectService;
    }

    async create(req: SubjectRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const data = await this.subjectService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data,
                message: "Subject created successfully.",
            });

        } catch (error) {
            next(error);
        }
    };

    async getAll(req: PaginationRequest, res: Response, next: NextFunction) {
        try {

            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: result.array() });
                return;
            }

            const parentId = req.query.parentId!;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const examCategories = await this.subjectService.getAll(parentId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: examCategories
            });

        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const data = await this.subjectService.getById(req.params.id);

            if (!data) {
                res.status(404).json({ message: "Subject not found" })
                return
            };

            res.status(200).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    };

    async update(req: SubjectRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const data = await this.subjectService.update(req.params.id, req.body);
            if (!data) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Subject not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data, message: "Subject updated successfully." });

        } catch (error) {
            next(error);
        }
    };

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const data = await this.subjectService.delete(req.params.id);
            if (!data) {
                res.status(404).json({ message: "Subject not found" });
                return;
            }

            res.status(200).json({ success: true, message: "Subject deleted successfully." });
        } catch (error) {
            next(error);
        }
    };
}

export default SubjectController;
