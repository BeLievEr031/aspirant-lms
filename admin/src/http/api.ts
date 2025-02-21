import api from ".";
import { IChapter, IExamCategory, IPagination, ISubject } from "../types";


// CRUD For study-material-exam-category
export const createStudyMaterialExamCategory = (examCategoryData: IExamCategory) => api.post("/exam-category", examCategoryData)

export const fetchStudyMaterialExamCategory = (pagination: IPagination) => api.get(`/exam-category?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&belong=${pagination.belong!}`)



// CRUD for study-material-exam-subject
export const createStudyMaterialSubject = (subjectData: ISubject) => api.post("/subject", subjectData)

export const fetchStudyMaterialSubject = (pagination: IPagination) => api.get(`/subject?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&parentId=${pagination.parentId!}`)



// CRUD for study-material-exam-chapter
export const createStudyMaterialChapter = (chapterData: IChapter) => api.post("/chapter", chapterData)

export const fetchStudyMaterialChapter = (pagination: IPagination) => api.get(`/chapter?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&parentId=${pagination.parentId!}`)



// CRUD for time-table-exam-category
export const createTimeTableExamCategory = (examCategoryData: IExamCategory) => api.post("/exam-category", examCategoryData)

export const fetchTimeTableExamCategory = (pagination: IPagination) => api.get(`/exam-category?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&belong=${pagination.belong!}`)



// CRUD for study-plan-exam-category
export const createStudyPlanExamCategory = (examCategoryData: IExamCategory) => api.post("/exam-category", examCategoryData)

export const fetchStudyPlanExamCategory = (pagination: IPagination) => api.get(`/exam-category?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&belong=${pagination.belong!}`)


// CRUD for lecture-exam-category
export const createLectureExamCategory = (examCategoryData: IExamCategory) => api.post("/exam-category", examCategoryData)

export const fetchLectureExamCategory = (pagination: IPagination) => api.get(`/exam-category?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&belong=${pagination.belong!}`)


// CRUD for resource-lecture

export const getPreSignedUrl = (query: { fileType: string; fileName: string }) => api.get(`/resource/pre-signed?fileType=${query.fileType}&fileName=${query.fileName}`)