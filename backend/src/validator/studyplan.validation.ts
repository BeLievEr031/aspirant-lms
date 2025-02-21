import { checkSchema } from "express-validator";

export const createStudyPlanValidation = checkSchema({
    examId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Exam ID",
        },
        notEmpty: {
            errorMessage: "Exam ID is required",
        },
    },
    data: {
        in: ["body"],
        isString: {
            errorMessage: "Data must be a string",
        },
        notEmpty: {
            errorMessage: "Data is required",
        },
        trim: true,
        toLowerCase: true,
    },
});

export const updateStudyPlanValidation = checkSchema({
    examId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Exam ID",
        },
        notEmpty: {
            errorMessage: "Exam ID is required",
        },
    },
    data: {
        in: ["body"],
        isString: {
            errorMessage: "Data must be a string",
        },
        notEmpty: {
            errorMessage: "Data is required",
        },
        trim: true,
        toLowerCase: true,
    },
});