import { checkSchema } from "express-validator";

export const idValidation = checkSchema({
    id: {
        in: ["params"],
        isMongoId: {
            errorMessage: "Invalid ID format",
        },
    },
});