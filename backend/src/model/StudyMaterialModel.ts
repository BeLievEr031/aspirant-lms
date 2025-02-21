import { model, Schema } from "mongoose"
import { IStudyMaterial } from "../types"

const studyMaterialSchema = new Schema<IStudyMaterial>({
    chapterId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Chapter"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    url: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const StudyMaterial = model<IStudyMaterial>("StudyMaterial", studyMaterialSchema)
export default StudyMaterial;