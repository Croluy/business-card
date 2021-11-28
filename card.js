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
    steam_username,
    discord_username,
    languages,
    pgp_key,
    pgp_keyserver_ubuntu,
    pgp_pk_ubuntu,
    pgp_pk_openpgp,
    pgp_upload,
} = user_data;

const prompt = inquirer.createPromptModule();

const data = {
    pgp_message: chalk.white("\nAlso feel free to sign my key and reupload it somewhere like: ") + chalk.cyan(`${pgp_upload}`) + chalk.white(".\n-Croluy\n"),

    name: chalk.bold.green(`                      ${user_name}`),
    work: `${chalk.white(`${job_title}`)}`,
    telegram: chalk.cyan("https://t.me/") + chalk.cyan(`${telegram_username}`),
    github: chalk.cyan("https://github.com/") + chalk.cyan(`${github_username}`),
    steam: chalk.cyan("https://steamcommunity.com/id/") + chalk.cyan(`${steam_username}`),
    discord: chalk.green(`${discord_username}`),
    npx: chalk.red("npx") + " " + chalk.white(`${npx_card_handle}`),
    languages: chalk.blue(`${languages}`),
    pgp: chalk.blue(`${pgp_key}`),

    labelWork: chalk.white.bold("        Info:"),
    labelLanguages: chalk.white.bold(" Programming Languages:"),
    labelTelegram: chalk.white.bold("          Telegram:"),
    labelGitHub: chalk.white.bold("        GitHub:"),
    labelSteam: chalk.white.bold("   Steam:"),
    labelDiscord: chalk.white.bold("               Discord:"),
    labelCard: chalk.white.bold("                 Card:"),
    labelPgp: chalk.white.bold("               PGP Key FingerPrint:"),
};

const questions = [
    {
        type: "list",
        name: "action",
        message: "What do you wish to do next?",
        choices: [
            {
                name: `Send me an email?`,
                value: () => {
                    open(`mailto:${user_email}`);
                    console.log("\nAwesome, see you soon at inbox.\n-Croluy\n");
                },
            },
            {
                name: `Download my PGP Key.`,
                value: () => {
                    open(`${pgp_pk_openpgp}`);
                    console.log(`%c\nAlso feel free to sign my key and reupload it somewhere like: `+`%c${pgp_upload}`+`%c.\n-Croluy\n`,`color:white;`,`color:cyan;`,`color:white;`);
                    console.log(`${data.pgp_message}`);
                },
            },
            {
                name: "Quit this menu.",
                value: () => {
                    console.log("Thanks for dropping by.\n-Croluy\n");
                },
            },
        ],
    },
];

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
        `${data.labelSteam}  ${data.steam}`,
        `${data.labelDiscord} ${data.discord}`,
        ``,
        `${data.labelPgp}`,
        `${data.pgp}`,
        ``,
        `${data.labelCard} ${data.npx}`,
        ``,
        `${chalk.italic("  I'm always seeking new opportunities, my inbox")}`,
        `${chalk.italic("  is always open. Whether you have a question or")}`,
        `${chalk.italic("  just want to say hi, I will try my best to get")}`,
        `${chalk.italic("  back to you!")}`,
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