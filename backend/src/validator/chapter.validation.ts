import { checkSchema } from "express-validator";

export const createChapterValidation = checkSchema({
    subjectId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Subject ID",
        },
        notEmpty: {
            errorMessage: "Subject ID is required",
        },
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name must be a string",
        },
        notEmpty: {
            errorMessage: "Name is required",
        },
        trim: true,
        toLowerCase: true,
    },
});

export const updateChapterValidation = checkSchema({
    subjectId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Subject ID",
        },
        notEmpty: {
            errorMessage: "Subject ID is required",
        },
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name must be a string",
        },
        notEmpty: {
            errorMessage: "Name is required",
        },
        trim: true,
        toLowerCase: true,
    },
});
