#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");

clear();

//! importing User Data from data.json
const res = fs.readFileSync(path.resolve(__dirname, "data.json"));
const user_data = JSON.parse(res);
const {
    user_name,
    user_email,
    telegram_username,
    github_username,
    npx_card_handle,
    job_title,
    languages,
} = user_data;

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What do you wish to do next?",
        choices: [
            //// Send an email
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open(`mailto:${user_email}`);
                    console.log("\nAwesome, see you soon at inbox.\n");
                },
            },
            //// Quit
            {
                name: "Quit this menu.",
                value: () => {
                    console.log("Thanks for dropping by.\n-Croluy\n");
                },
            },
        ],
    },
];

const data = {
    name: chalk.bold.green(`                     ${user_name}`),
    work: `${chalk.white(`${job_title}`)}`,
    telegram: chalk.cyan("https://t.me/") + chalk.cyan(`${telegram_username}`),
    github: chalk.cyan("https://github.com/") + chalk.cyan(`${github_username}`),
    npx: chalk.red("npx") + " " + chalk.white(`${npx_card_handle}`),
    languages: chalk.blue(`${languages}`),

    labelWork: chalk.white.bold("        Info:"),
    labelLanguages: chalk.white.bold("Programming Languages:"),
    labelTelegram: chalk.white.bold("         Telegram:"),
    labelGitHub: chalk.white.bold("        GitHub:"),
    labelCard: chalk.white.bold("              Card:"),
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelLanguages}  ${data.languages}`,
        ``,
        `${data.labelTelegram}  ${data.telegram}`,
        `${data.labelGitHub}  ${data.github}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic("I'm always seeking new opportunities,")}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic("question or just want to say hi, I will try ")}`,
        `${chalk.italic("my best to get back to you!")}`,
    ].join("\n"),
    {
        margin: 1,
        float: "center",
        padding: 1,
        borderStyle: "single",
        borderColor: "green",
    }
);

console.log(me);

prompt(questions).then(answer => answer.action());