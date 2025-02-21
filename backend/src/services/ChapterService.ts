import Chapter from "../model/ChapterModel";
import { IChapter } from "../types";

class ChapterService {
    constructor(private chapterRepo: typeof Chapter) {
        this.chapterRepo = chapterRepo;
    }

    async create(data: IChapter) {
        return await this.chapterRepo.create(data);
    }

    async getAll(id: string, page: number = 1, limit: number = 10, sortBy: string = "createdAt", order: string = "desc") {
        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [data, total] = await Promise.all([
            this.chapterRepo.find({ subjectId: id }).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit),
            this.chapterRepo.countDocuments()
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
        return await this.chapterRepo.findById(id).populate("subjectId");
    }

    async update(id: string, data: Partial<IChapter>) {
        return await this.chapterRepo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await this.chapterRepo.findByIdAndDelete(id);
    }

}

export default ChapterService;