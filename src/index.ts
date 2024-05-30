#!/usr/bin/env node
import { Faker, fr } from "@faker-js/faker";
import { editor, input } from "@inquirer/prompts";
import chalk from "chalk";
import { selectCategory } from "./selectCategory.js";
import { selectSubcategory } from "./selectSubcategory.js";

// Types
type Value = { category: string; subcategory: string | null };
const numbers = ["bigInt", "float", "int"];

// Custom faker for french variables
const customFaker = new Faker({ locale: [fr] });

// Functions

const printBlankLine = () => {
    console.log();
};

const printHeader = () => {
    console.clear();
    console.log(
        "----------------------------------------------------------------------"
    );
    console.log(
        chalk.bold(
            "|                              FakerCLI                              |"
        )
    );
    console.log(
        "----------------------------------------------------------------------"
    );
    console.log();
};

/**
 * @returns {Promise<string>} Name of the table
 */
const getTableName = async () => {
    const tableName = await input({
        message: "Nom de la table",
        theme: {
            style: {
                message: (text: string) => chalk.blue(text),
                error: (text: string) => chalk.red(text),
            },
        },
    });
    return tableName;
};

/**
 * @param i {number} - Index of the column
 * @returns {Promise<string>} Name of the column
 */
const getColumnName = async (i: number) => {
    return await input({
        message: `Nom de la colonne ${i} (laisser vide pour terminer)`,
        theme: {
            style: {
                message: (text: string) => chalk.green(text),
                error: (text: string) => chalk.red(text),
            },
        },
    });
};

const getNumberOfRows = async () => {
    const number = await input({
        message: "Number of rows ?",
        validate(value) {
            const parsedValue = parseInt(value, 10);

            if (isNaN(parsedValue)) {
                return "Seul les nombres sont autorisés";
            }

            return true;
        },
    });

    return parseInt(number);
};

const formateValues = (valuesList: Value[], multiplier: number) => {
    const values: any[] = [];

    for (let index = 0; index <= multiplier; index++) {
        const fakerValues = valuesList.map((value) => {
            if (value.category !== "null") {
                const fakeValue = eval(
                    `customFaker.${value.category}.${value.subcategory}()`
                );
                if (value.subcategory && !numbers.includes(value.subcategory)) {
                    return `'${fakeValue}'`;
                }
                return fakeValue;
            } else {
                return "NULL";
            }
        });

        values.push(`(${fakerValues})`);
    }

    return values;
};

/** Display SQL request in text editor
 * @param tables
 * @param columns
 * @param values
 */
const printResult = async (tables: string, columns: string, values: any[]) => {
    await editor({
        message: "SQL request : ",
        waitForUseInput: false,
        default: `INSERT INTO ${tables} (${columns}) VALUES ${values}`,
    });
};

// Variables
let columnsList: string[] = [];
let valuesList: Value[] = [];
let columnIndex = 1;
let isEnd = false;

// Print header
printHeader();

// Get table name
const tableName = await getTableName();

while (true) {
    let columnName = "";
    do {
        printBlankLine();

        // Get column name
        columnName = await getColumnName(columnIndex);

        // End
        if (columnName === "") {
            isEnd = true;
            break;
        }

        // Add name to the list
        columnsList.push(columnName);

        while (true) {
            // Get category
            const category = await selectCategory(columnName);

            if (category === "return") {
                columnsList.pop();
                break;
            }

            // Get subcategory
            const subcategory = await selectSubcategory(category);

            if (subcategory === "return") {
                continue;
            }

            // Add to the list of values
            valuesList.push({ category, subcategory });
            break;
        }
        columnIndex++;
    } while (columnName !== "");

    if (isEnd) break;
}

// Get numbers of lines
printBlankLine();
const rowsNumber = await getNumberOfRows();

// Format result
const columns = columnsList.toString();
const values = formateValues(valuesList, rowsNumber);

// Display result
printBlankLine();
await printResult(tableName, columns, values);
