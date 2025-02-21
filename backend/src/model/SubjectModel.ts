import { model, Schema } from "mongoose"
import { ISubject } from "../types"

const subjectSchema = new Schema<ISubject>({
    examId: {
        type: Schema.Types.ObjectId,
        ref: "ExamCategory"
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
}, {
    timestamps: true
})

const Subject = model("Subject", subjectSchema)
export default Subject;