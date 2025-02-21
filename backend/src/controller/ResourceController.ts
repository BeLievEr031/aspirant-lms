import { validationResult } from "express-validator";
import ResourceService from "../services/ResourceService";
import { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../utils/constant";
import { PaginationRequest, PreSignedUrlRequest } from "../types";
class ResourceController {
    constructor(private resourceService: ResourceService) {
        this.resourceService = resourceService;
    }

    async generatePreSigned(req: PreSignedUrlRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const { fileName, fileType } = req.query;
            const url = await this.resourceService.generatePresSigned(fileName, fileType)
            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: url
            })
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const resource = await this.resourceService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({ success: true, data: resource, message: "Resource created successfully." });
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
            const chpaterId = req.query.chapterId!

            const result = await this.resourceService.getAll(chpaterId, page, limit, sortBy, order);

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: result,
                message: "Resource fetched."
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

            const resource = await this.resourceService.getById(req.params.id);
            if (!resource) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: resource });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const updatedResource = await this.resourceService.update(req.params.id, req.body);
            if (!updatedResource) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: updatedResource, message: "Resource updated successfully." });
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

            const deletedResource = await this.resourceService.delete(req.params.id);
            if (!deletedResource) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Resource deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default ResourceController;