import StudyMaterial from "../model/StudyMaterialModel";
import { IStudyMaterial } from "../types";


class StudyMaterialService {

    constructor(private studyMaterialRepo: typeof StudyMaterial) {
        this.studyMaterialRepo = studyMaterialRepo;
    }

    async createStudyMaterial(data: IStudyMaterial) {
        return await this.studyMaterialRepo.create(data);
    }

    async getAllStudyMaterials() {
        return await this.studyMaterialRepo.find({});
    }

    async getStudyMaterialById(id: string) {
        return await this.studyMaterialRepo.findById(id);
    }

    async updateStudyMaterial(id: string, data: IStudyMaterial) {
        return await this.studyMaterialRepo.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteStudyMaterial(id: string) {
        return await this.studyMaterialRepo.findByIdAndDelete(id);
    }
}


export default StudyMaterialService;