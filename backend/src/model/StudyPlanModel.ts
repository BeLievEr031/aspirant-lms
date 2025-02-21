import { model, Schema } from "mongoose";
import { IStudyPlan } from "../types";

const studyPlanSchema = new Schema<IStudyPlan>({
    data: {
        type: String,
        required: true,
        trim: true,
    },
    examId: {
        type: Schema.Types.ObjectId,
        ref: "ExamCategory"
    }
}, {
    timestamps: true
})


const StudyPlan = model<IStudyPlan>("StudyPlan", studyPlanSchema)
export default StudyPlan;