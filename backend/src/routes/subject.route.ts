import { Request, Response, NextFunction, Router } from "express"
import SubjectService from "../services/SubjectService";
import Subject from "../model/SubjectModel";
import SubjectController from "../controller/SubjectController";
import { createSubjectValidation, updateSubjectValidation } from "../validator/subject.validation";
import { PaginationRequest, SubjectRequest } from "../types";
import { idValidation } from "../validator/common.validation";
import { paginationValidation } from "../validator/pagination.validation";

const subjectRouter = Router();
const subjectService = new SubjectService(Subject);
const subjectController = new SubjectController(subjectService)

subjectRouter.post("/", createSubjectValidation, (req: Request, res: Response, next: NextFunction) => subjectController.create(req as SubjectRequest, res, next));

subjectRouter.get("/", paginationValidation, (req: Request, res: Response, next: NextFunction) =>
    subjectController.getAll(req as PaginationRequest, res, next)
);

subjectRouter.get("/:id", idValidation, (req: Request, res: Response, next: NextFunction) => subjectController.getById(req, res, next));

subjectRouter.put("/:id", idValidation, updateSubjectValidation, (req: Request, res: Response, next: NextFunction) => subjectController.update(req as SubjectRequest, res, next));

subjectRouter.delete("/:id", idValidation, (req: Request, res: Response, next: NextFunction) => subjectController.delete(req, res, next));

export default subjectRouter