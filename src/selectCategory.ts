import { select } from "@inquirer/prompts";

export const selectCategory = async (columnName: string) => {
    const category = await select({
        message: `Type de donnée pour ${columnName}`,
        choices: [
            {
                name: "retour",
                value: "return",
            },
            {
                value: "commerce",
            },
            {
                value: "company",
            },
            {
                value: "internet",
            },
            {
                value: "location",
            },
            {
                value: "lorem",
            },
            {
                value: "music",
            },
            {
                value: "null",
            },
            {
                value: "person",
            },
            {
                value: "phone",
            },
            {
                value: "vehicule",
            },
        ],
    });

    return category;
};
