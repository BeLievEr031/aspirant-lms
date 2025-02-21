import { checkSchema } from "express-validator";

const createExamCategoryValidation = checkSchema({
    label: {
        in: ["body"],
        isString: {
            errorMessage: "Label must be a string",
        },
        notEmpty: {
            errorMessage: "Label is required",
        },
        trim: true,
    },
    belong: {
        in: ["body"],
        isString: {
            errorMessage: "Belong must be a string",
        },
        isIn: {
            options: [["study-material", "time-table", "study-plan", "upload-lectures", "upload-quizz"]],
            errorMessage: "Belong must be one of the allowed values",
        },
        notEmpty: {
            errorMessage: "Belong is required",
        },
    },
});

const updateExamCategoryValidation = checkSchema({
    label: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "Label must be a string",
        },
        trim: true,
    },
    belong: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "Belong must be a string",
        },
        isIn: {
            options: [["study-material", "time-table", "study-plan", "upload-lectures", "upload-quizz"]],
            errorMessage: "Belong must be one of the allowed values",
        },
    },
});


export { createExamCategoryValidation, updateExamCategoryValidation };
