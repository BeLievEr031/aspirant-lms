import { checkSchema } from "express-validator";

export const createSubjectValidation = checkSchema({
    examId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Exam Category ID",
        },
        notEmpty: {
            errorMessage: "Exam Category ID is required",
        },
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Subject name must be a string",
        },
        notEmpty: {
            errorMessage: "Subject name is required",
        },
        trim: true,
    },
});

export const updateSubjectValidation = checkSchema({
    examId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Exam Category ID",
        },
        notEmpty: {
            errorMessage: "Exam Category ID is required",
        },
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Subject name must be a string",
        },
        notEmpty: {
            errorMessage: "Subject name is required",
        },
        trim: true,
    },
});
