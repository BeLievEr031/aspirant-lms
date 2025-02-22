import Resource from "../model/ResourceModel";
import { IResource } from "../types";
import generatePreSignedUrl, { generatePreSignedUrlForFetch } from "../utils/generatePreSignedUrl";

class ResourceService {
    constructor(private resourceRepo: typeof Resource) {
        this.resourceRepo = resourceRepo;
    }

    async generatePreSigned(fileName: string, fileType: string) {
        return await generatePreSignedUrl(fileName, fileType)
    }

    async generatePreSignedUrlForFetch(key: string) {
        return await generatePreSignedUrlForFetch(key)
    }

    async create(data: IResource) {
        return await this.resourceRepo.create(data);
    }

    async getAll(chapterId: string, page: number = 1, limit: number = 10, sortBy: string = "createdAt", order: string = "desc") {
        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [data, total] = await Promise.all([
            this.resourceRepo.find({ chapterId }).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit),
            this.resourceRepo.countDocuments()
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
        return await this.resourceRepo.findById(id).populate("chapterId");
    }

    async update(id: string, data: Partial<IResource>) {
        return await this.resourceRepo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await this.resourceRepo.findByIdAndDelete(id);
    }
}

export default ResourceService;