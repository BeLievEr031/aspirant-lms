import { checkSchema } from "express-validator";


export const generatePreSignedUrlValidation = checkSchema({

    fileType: {
        in: ['query'],
        notEmpty: {
            errorMessage: "File type is required."
        },
        trim: true,
    },
    fileName: {
        in: ['query'],
        notEmpty: {
            errorMessage: "File name is required."
        },
        trim: true,
    }

})

export const createResourceValidation = checkSchema({
    chapterId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Chapter ID",
        },
        notEmpty: {
            errorMessage: "Chapter ID is required",
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
    url: {
        in: ["body"],
        isString: {
            errorMessage: "Url must be a string",
        },
        notEmpty: {
            errorMessage: "Url is required",
        },
    },
});

export const updateResourceValidation = checkSchema({
    chapterId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid Chapter ID",
        },
        notEmpty: {
            errorMessage: "Chapter ID is required",
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
