import { select } from "@inquirer/prompts";

export const selectSubcategory = async (category: string) => {
    let subcategory = "";

    switch (category) {
        case "retour":
            subcategory = "return";
            break;

        case "commerce":
            break;

        case "company":
            break;

        case "internet":
            subcategory = await select({
                message: "Internet",
                choices: [
                    {
                        name: "retour",
                        value: "return",
                    },
                    {
                        value: "color",
                    },
                    {
                        value: "displayName",
                    },
                    {
                        value: "email",
                    },
                    {
                        value: "password",
                    },
                    {
                        value: "userName",
                    },
                ],
            });
            break;

        case "music":
            break;

        case "location":
            break;

        case "lorem":
            break;

        case "person":
            subcategory = await select({
                message: "Person",
                choices: [
                    {
                        name: "retour",
                        value: "return",
                    },
                    {
                        value: "firstName",
                    },
                    {
                        value: "fullName",
                    },
                    {
                        value: "gender",
                    },
                    {
                        value: "jobArea",
                    },
                    {
                        value: "jobDescription",
                    },
                    {
                        value: "jobTitle",
                    },
                    {
                        value: "jobType",
                    },
                    {
                        value: "lastName",
                    },
                    {
                        value: "middleName",
                    },
                    {
                        value: "prefix",
                    },
                    {
                        value: "sex",
                    },
                    {
                        value: "sexType",
                    },
                    {
                        value: "suffix",
                    },
                    {
                        value: "zodiacSign",
                    },
                ],
            });
            break;

        case "phone":
            subcategory = await select({
                message: "phone",
                choices: [
                    {
                        value: "number",
                    },
                ],
            });
            break;

        case "vehicule":
            subcategory = await select({
                message: "vehicule",
                choices: [
                    {
                        value: "bicycle",
                    },
                    {
                        value: "color",
                    },
                    {
                        value: "fuel",
                    },
                    {
                        value: "manufacturer",
                    },
                    {
                        value: "model",
                    },
                    {
                        value: "type",
                    },
                    {
                        value: "vehicule",
                    },
                    {
                        value: "vin",
                    },
                    {
                        value: "vrm",
                    },
                ],
            });
            break;

        default:
            break;
    }

    return subcategory;
};
