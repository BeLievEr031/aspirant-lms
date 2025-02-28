import mongoose from "mongoose";
import { Request } from "express"
export interface IExamCategory {
    label: string;
    belong: string | "study-material" | 'time-table' | 'study-plan' | 'upload-lectures' | 'upload-quizz'
}

export interface IStudyPlan {
    data: string;
    examId: mongoose.Schema.Types.ObjectId
}

export interface ISubject {
    name: string;
    examId: mongoose.Schema.Types.ObjectId
}

export interface IChapter {
    name: string;
    subjectId: mongoose.Schema.Types.ObjectId
}

export interface IResource {
    name: string;
    url: string;
    chapterId: mongoose.Schema.Types.ObjectId;
    belong: string | "study-material" | 'time-table' | 'study-plan' | 'upload-lectures' | 'upload-quizz'
}

export interface ExamCategoryRequest extends Request {
    body: IExamCategory
}

export interface PaginationRequest extends Request {
    query: {
        page: string;
        limit: string;
        sortBy: string;
        order: "asc" | "desc";
        parentId?: string;
        belong?: string;
        chapterId?: string;
        examId?: string;
    }
}


export interface SubjectRequest extends Request {
    body: ISubject
}

export interface ChapterRequest extends Request {
    body: IChapter
}

export interface ResourceRequest extends Request {
    body: IResource
}

export interface StudyPlanRequest extends Request {
    body: IStudyPlan
}

export interface IStudyMaterial {
    chapterId: mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    url: string;
}

export interface StudyMaterialRequest extends Request {
    body: IStudyMaterial
}

export interface IPreSigned {
    fileType: string;
    fileName: string;
}

export interface PreSignedUrlRequest extends Request {
    query: {
        fileType: string;
        fileName: string;
        key: string;
    }
}

