import { createStudyMaterialChapter, createStudyMaterialExamCategory, createStudyMaterialSubject, fetchStudyMaterialChapter, fetchStudyMaterialExamCategory, fetchStudyMaterialSubject } from "../../../http/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPagination } from "../../../types";


// CRUD Exam Category
export const useCreateExamCategory = (cb: (isModel: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStudyMaterialExamCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exam-category-for-study-material"] });
            cb(false)
        }
    });
};

export const useExamCategoryFetch = (pagination: IPagination) => {
    return useQuery(
        {
            queryKey: ['exam-category-for-study-material', pagination],
            queryFn: () => fetchStudyMaterialExamCategory(pagination),
            staleTime: 60 * 1000 * 10,
        }
    )
}



// CRUD Exam Category
export const useStudyMaterialSubjecMutation = (cb: (isModel: boolean) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudyMaterialSubject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subject-for-study-material"] });
            cb(false)
        }
    });
}

export const useStudyMaterialSubjectQuery = (pagination: IPagination) => {
    return useQuery(
        {
            queryKey: ['subject-for-study-material', pagination],
            queryFn: () => fetchStudyMaterialSubject(pagination),
            staleTime: 60 * 1000 * 10,
        }
    )
}

// CRUD Exam Resource
export const useStudyMaterialChapterMutation = (cb: (isModel: boolean) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudyMaterialChapter,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapter-for-study-material"] });
            cb(false)
        }
    });
}

export const useStudyMaterialChapterQuery = (pagination: IPagination) => {
    return useQuery(
        {
            queryKey: ['chapter-for-study-material', pagination],
            queryFn: () => fetchStudyMaterialChapter(pagination),
            staleTime: 60 * 1000 * 10,
        }
    )
}