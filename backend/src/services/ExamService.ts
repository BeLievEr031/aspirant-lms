import ExamCategory from "../model/ExamCategoryModel";
import { IExamCategory } from "../types";

class ExamService {
    constructor(private examCategoryRepo: typeof ExamCategory) {
        this.examCategoryRepo = examCategoryRepo
    }

    async create(data: IExamCategory) {
        return await this.examCategoryRepo.create(data);
    }

    async getAll(page: number = 1, limit: number = 10, sortBy: string = "createdAt", order: string = "desc", belong: string) {
        const skip = (page - 1) * limit;

        // Ensure valid sort order
        const sortOrder = order === "asc" ? 1 : -1;

        const [data, total] = await Promise.all([
            this.examCategoryRepo.find({ belong: belong })
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit),
            this.examCategoryRepo.countDocuments()
        ]);

        return {
            total,
            totalPages: Math.ceil(total / limit),
            data,
        };
    }


    async getById(id: string) {
        return await this.examCategoryRepo.findById(id);
    }

    async update(id: string, data: Partial<IExamCategory>) {
        return await this.examCategoryRepo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await this.examCategoryRepo.findByIdAndDelete(id);
    }
}

export default ExamService;
