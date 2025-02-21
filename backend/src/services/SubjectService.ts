import Subject from "../model/SubjectModel";
import { ISubject } from "../types";

class SubjectService {
    constructor(private subjectRepo: typeof Subject) {
        this.subjectRepo = subjectRepo
    }

    async create(data: ISubject) {
        return await this.subjectRepo.create(data);
    }

    async getAll(id: string, page: number = 1, limit: number = 10, sortBy: string = "createdAt", order: string = "desc") {
        const skip = (page - 1) * limit;

        const sortOrder = order === "asc" ? 1 : -1;
        const [data, total] = await Promise.all([
            this.subjectRepo.find({ examId: id })
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit),
            this.subjectRepo.countDocuments()
        ]);

        return {
            total,
            totalPages: Math.ceil(total / limit),
            data,
        };
    }

    async getById(id: string) {
        return await this.subjectRepo.findById(id).populate("examId");
    }

    async update(id: string, data: ISubject) {
        return await this.subjectRepo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await this.subjectRepo.findByIdAndDelete(id);
    }
}

export default SubjectService;



