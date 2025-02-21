import { Request, Response, NextFunction, Router } from "express"
import ResourceService from "../services/ResourceService";
import Resource from "../model/ResourceModel";
import ResourceController from "../controller/ResourceController";
import { createResourceValidation, generatePreSignedUrlValidation, updateResourceValidation } from "../validator/resource.validation";
import { PaginationRequest, PreSignedUrlRequest, ResourceRequest } from "../types";
import { idValidation } from "../validator/common.validation";
import { resourcePaginationValidation } from "../validator/pagination.validation";

const resourceRouter = Router();

const resourceService = new ResourceService(Resource);
const resourceController = new ResourceController(resourceService);

resourceRouter.get("/pre-signed", generatePreSignedUrlValidation, (req: Request, res: Response, next: NextFunction) => resourceController.generatePreSigned(req as PreSignedUrlRequest, res, next))

resourceRouter.post("/", createResourceValidation, (req: Request, res: Response, next: NextFunction) => resourceController.create(req as ResourceRequest, res, next))

resourceRouter.put("/:id", idValidation, updateResourceValidation, (req: Request, res: Response, next: NextFunction) => resourceController.update(req as ResourceRequest, res, next))

resourceRouter.delete("/:id", idValidation, (req: Request, res: Response, next: NextFunction) => resourceController.delete(req, res, next))

resourceRouter.get("/", resourcePaginationValidation, (req: Request, res: Response, next: NextFunction) => resourceController.getAll(req as PaginationRequest, res, next))

resourceRouter.get("/", idValidation, (req: Request, res: Response, next: NextFunction) => resourceController.getById(req, res, next))


export default resourceRouter;