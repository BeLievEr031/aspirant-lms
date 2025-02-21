import { model, Schema } from "mongoose"
import { IChapter } from "../types"

const chapterSchema = new Schema<IChapter>({
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
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

const Chapter = model("Chapter", chapterSchema)
export default Chapter;