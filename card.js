#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
//const request = require("request");
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
    linkedin_username,
    github_username,
    personal_site,
    npx_card_handle,
    job_title,
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
    name: chalk.bold.green(`                  ${user_name}`),
    // work: `${chalk.white("Software Engineer at")} ${chalk.hex("#2b82b2").bold("ClearTax")}`,
    work: `${chalk.white(`${job_title}`)}`,
    telegram: chalk.gray("https://t.me/") + chalk.cyan(`${telegram_username}`),
    github: chalk.gray("https://github.com/") + chalk.green(`${github_username}`),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue(`${linkedin_username}`),
    web: chalk.cyan(`${personal_site}`),
    npx: chalk.red("npx") + " " + chalk.white(`${npx_card_handle}`),

    labelWork: chalk.white.bold("       Work:"),
    labelTelegram: chalk.white.bold("    Telegram:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTelegram}  ${data.telegram}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic("I am currently looking for new opportunities,")}`,
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
