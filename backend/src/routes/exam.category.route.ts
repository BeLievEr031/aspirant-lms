import { Request, Response, NextFunction, Router } from "express";
import { createExamCategoryValidation, updateExamCategoryValidation } from '../validator/examCategory.validation';
import ExamController from '../controller/ExamController';
import ExamService from '../services/ExamService';
import { ExamCategoryRequest, PaginationRequest } from "../types";
import ExamCategory from "../model/ExamCategoryModel";
import { idValidation } from "../validator/common.validation";

const examCategoryRouter = Router();
const examService = new ExamService(ExamCategory);
const examController = new ExamController(examService);

examCategoryRouter.get("/", (req: Request, res: Response, next: NextFunction) => examController.getAll(req as PaginationRequest, res, next));

examCategoryRouter.get("/:id", idValidation, (req: Request, res: Response, next: NextFunction) => examController.getById(req, res, next));

examCategoryRouter.post("/", createExamCategoryValidation, (req: Request, res: Response, next: NextFunction) => examController.create(req as ExamCategoryRequest, res, next));

examCategoryRouter.put("/", idValidation, updateExamCategoryValidation, (req: Request, res: Response, next: NextFunction) => examController.update(req as ExamCategoryRequest, res, next));

examCategoryRouter.delete("/", idValidation, (req: Request, res: Response, next: NextFunction) => examController.delete(req, res, next));

export default examCategoryRouter;


