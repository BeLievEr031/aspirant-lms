import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IPagination } from "../../../types"
import { createStudyPlan, createStudyPlanExamCategory, fetchStudyPlan, fetchStudyPlanExamCategory } from "../../../http/api"


export const useStudyPlanExamQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["study-plan-exam-category", pagination],
        queryFn: () => fetchStudyPlanExamCategory(pagination)
    })
}

export const useStudyPlanExamMutation = (cb: (data: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStudyPlanExamCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["study-plan-exam-category"] });
            cb(false)
        }
    });
}

export const useStudyPlanResourceQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["study-plan-resource", pagination],
        queryFn: () => fetchStudyPlan(pagination)
    })
}


export const useStudyPlanResourceMutation = (cb: (data: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStudyPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["study-plan-resource"] });
            cb(false)
        }
    });
}