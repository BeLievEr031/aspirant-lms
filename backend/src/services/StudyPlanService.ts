import ExamCategory from "../model/ExamCategoryModel";
import StudyPlan from "../model/StudyPlanModel";
import { IExamCategory, IStudyPlan } from "../types";

class StudyPlanService {
    constructor(private studyPlanRepo: typeof StudyPlan, private examCategoryRepo: typeof ExamCategory) {
        this.studyPlanRepo = studyPlanRepo;
        this.examCategoryRepo = examCategoryRepo;
    }

    async createExamCategory(data: IExamCategory) {
        return await this.examCategoryRepo.create(data);
    }
    async create(data: IStudyPlan) {
        return await this.studyPlanRepo.create(data);
    }

    async getAll(page: number = 1, limit: number = 10, sortBy: string = "createdAt", order: string = "desc", examId: string) {
        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [data, total] = await Promise.all([
            this.studyPlanRepo.find({ examId }).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit).populate("examId"),
            this.studyPlanRepo.countDocuments()
        ]);

        return {
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            sortBy,
            order,
            data,
        };
    }

    async getById(id: string) {
        return await this.studyPlanRepo.findById(id).populate("examId");
    }

    async update(id: string, data: Partial<IStudyPlan>) {
        return await this.studyPlanRepo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await this.studyPlanRepo.findByIdAndDelete(id);
    }

}

export default StudyPlanService;