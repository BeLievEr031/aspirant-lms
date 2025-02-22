import { model, Schema } from "mongoose";
import { IResource } from "../types";

const resourceSchema = new Schema<IResource>({
    chapterId: {
        type: Schema.Types.ObjectId,
        ref: "Chapter"
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    url: {
        type: String,
        required: true,
    },
    belong: {
        type: String,
        required: true,
        enum: ["study-material", 'time-table', 'study-plan', 'upload-lectures', 'upload-quizz']
    }
}, {
    timestamps: true
})

const Resource = model("Resource", resourceSchema)
export default Resource;