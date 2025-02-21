import { model, Schema } from "mongoose"
import { IExamCategory } from "../types"

const examCategorySchema = new Schema<IExamCategory>({
    label: {
        type: String,
        required: true,
        index: true,
        trim: true,
        lowercase: true
    },
    belong: {
        type: String,
        required: true,
        enum: ["study-material", 'time-table', 'study-plan', 'upload-lectures', 'upload-quizz']
    }
}, {
    timestamps: true
})

const ExamCategory = model<IExamCategory>("ExamCategory", examCategorySchema)
export default ExamCategory;

