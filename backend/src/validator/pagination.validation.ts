import { checkSchema } from "express-validator";

export const paginationValidation = checkSchema({
    page: {
        in: ["query"],
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "Page must be a positive integer",
        },
        toInt: true, // Converts to an integer
    },
    limit: {
        in: ["query"],
        optional: true,
        isInt: {
            options: { min: 1, max: 100 },
            errorMessage: "Limit must be between 1 and 100",
        },
        toInt: true, // Converts to an integer
    },
    sortBy: {
        in: ["query"],
        optional: true,
        isString: {
            errorMessage: "SortBy must be a string",
        },
        trim: true,
    },
    order: {
        in: ["query"],
        optional: true,
        isIn: {
            options: [["asc", "desc"]],
            errorMessage: "Order must be either 'asc' or 'desc'",
        },
        trim: true,
    },
});

export const resourcePaginationValidation = checkSchema({
    page: {
        in: ["query"],
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "Page must be a positive integer",
        },
        toInt: true, // Converts to an integer
    },
    limit: {
        in: ["query"],
        optional: true,
        isInt: {
            options: { min: 1, max: 100 },
            errorMessage: "Limit must be between 1 and 100",
        },
        toInt: true, // Converts to an integer
    },
    sortBy: {
        in: ["query"],
        optional: true,
        isString: {
            errorMessage: "SortBy must be a string",
        },
        trim: true,
    },
    order: {
        in: ["query"],
        optional: true,
        isIn: {
            options: [["asc", "desc"]],
            errorMessage: "Order must be either 'asc' or 'desc'",
        },
        trim: true,
    },
    chapterId: {
        in: ["query"],
        optional: false,
        isMongoId: {
            errorMessage: "Chapter Id must be mongodb id."
        }
    }
});
