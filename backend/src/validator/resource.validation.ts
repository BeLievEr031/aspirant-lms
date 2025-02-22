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
