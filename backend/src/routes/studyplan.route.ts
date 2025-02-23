import { Request, Response, NextFunction, Router } from "express"
import { createStudyPlanValidation, updateStudyPlanValidation } from "../validator/studyplan.validation";
import StudyPlan from "../model/StudyPlanModel";
import { idValidation } from "../validator/common.validation";
import { paginationValidation } from "../validator/pagination.validation";
import StudyPlanService from "../services/StudyPlanService";
import StudyPlanController from "../controller/StudyPlanController";
import { PaginationRequest, StudyPlanRequest } from "../types";
import { createExamCategoryValidation } from "../validator/examCategory.validation";
import ExamCategory from "../model/ExamCategoryModel";

const studyPlanRouter = Router();
const studyService = new StudyPlanService(StudyPlan, ExamCategory);
const studyController = new StudyPlanController(studyService);

studyPlanRouter.post("/", createExamCategoryValidation, (req: Request, res: Response, next: NextFunction) => studyController.create(req as StudyPlanRequest, res, next))

studyPlanRouter.post("/resource", createStudyPlanValidation, (req: Request, res: Response, next: NextFunction) => studyController.create(req as StudyPlanRequest, res, next))


studyPlanRouter.get("/", paginationValidation, (req: Request, res: Response, next: NextFunction) => studyController.getAll(req as PaginationRequest, res, next))

studyPlanRouter.put("/:id", idValidation, updateStudyPlanValidation, (req: Request, res: Response, next: NextFunction) => studyController.update(req as StudyPlanRequest, res, next))

studyPlanRouter.delete("/:id", idValidation, (req: Request, res: Response, next: NextFunction) => studyController.delete(req, res, next))

studyPlanRouter.get("/", idValidation, (req: Request, res: Response, next: NextFunction) => studyController.getById(req, res, next))

export default studyPlanRouter;