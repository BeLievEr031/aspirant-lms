import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import StudyMaterialService from "../services/StudyMaterialService";
import { StudyMaterialRequest } from "../types";
import { HTTP_STATUS } from "../utils/constant";

class StudyMaterialController {
    constructor(private studyMaterialService: StudyMaterialService) {
        this.studyMaterialService = studyMaterialService;
    }

    // ✅ Create Study Material
    create = async (req: StudyMaterialRequest, res: Response, next: NextFunction) => {
        try {
            // Validate Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return
            }

            const material = await this.studyMaterialService.createStudyMaterial(req.body);
            res.status(HTTP_STATUS.CREATED).json({ success: true, data: material });
        } catch (error) {
            next(error);
        }
    };

    // ✅ Get All Study Materials
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const materials = await this.studyMaterialService.getAllStudyMaterials();
            res.status(HTTP_STATUS.OK).json({ success: true, data: materials });
        } catch (error) {
            next(error);
        }
    };

    // ✅ Get Single Study Material
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const material = await this.studyMaterialService.getStudyMaterialById(req.params.id);
            if (!material) return res.status(404).json({ message: "Material not found" });

            res.json({ success: true, data: material });
        } catch (error) {
            next(error);
        }
    };

    // ✅ Update Study Material
    update = async (req: StudyMaterialRequest, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const updatedMaterial = await this.studyMaterialService.updateStudyMaterial(req.params.id, req.body);
            if (!updatedMaterial) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Material not found" });
                return
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: updatedMaterial });
        } catch (error) {
            next(error);
        }
    };

    // ✅ Delete Study Material
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return
            }

            const deleted = await this.studyMaterialService.deleteStudyMaterial(req.params.id);
            if (!deleted) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Material not found" });
                return
            }
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Material deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
}

export default StudyMaterialController;
