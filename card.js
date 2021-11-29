#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const path = require("path");

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
    pgp_pk_openpgp,
    pgp_upload,
} = user_data;

const res_v = fs.readFileSync(path.resolve(__dirname, "package.json"));
const package_data = JSON.parse(res_v);
const {
    version,
} = package_data;

const prompt = inquirer.createPromptModule();

const defaultc = chalk.hex('#FFFFFF');
const text = chalk.italic;

const data = {
    question: defaultc("What do you wish to do next?"),
    email_q: defaultc("Send me an email?"),
    email_message: defaultc("Awesome, see you soon at inbox.\n-Croluy\n"),
    pgp_q: defaultc("Download my PGP Key."),
    pgp_message: defaultc("Also feel free to sign my key and reupload it somewhere like: ") + chalk.cyan(`${pgp_upload}`) + defaultc(".\n-Croluy\n"),
    quit_q: defaultc("Quit this menu."),
    quit_message: defaultc("Thanks for dropping by.\n-Croluy\n"),

    name: chalk.bold.green(`                      ${user_name}`),
    work: `${defaultc(`${job_title}`)}`,
    languages: chalk.blue(`${languages}`),
    telegram: chalk.cyan("https://t.me/") + chalk.cyan(`${telegram_username}`),
    github: chalk.cyan("https://github.com/") + chalk.cyan(`${github_username}`),
    steam: chalk.cyan("https://steamcommunity.com/id/") + chalk.cyan(`${steam_username}`),
    discord: chalk.cyan(`${discord_username}`),
    npx: chalk.blue("npx") + " " + defaultc(`${npx_card_handle}`),
    pgp: chalk.blue(`${pgp_key}`),
    ver: chalk.green.bold(`${version}`),

    labelWork: chalk.white.bold("        Info:"),
    labelLanguages: chalk.white.bold(" Programming Languages:"),
    labelTelegram: chalk.white.bold("          Telegram:"),
    labelGitHub: chalk.white.bold("        GitHub:"),
    labelSteam: chalk.white.bold("   Steam:"),
    labelDiscord: chalk.white.bold("               Discord:"),
    labelCard: chalk.white.bold("                 Card:"),
    labelPgp: chalk.white.bold("               PGP Key FingerPrint:"),
    labelVer: chalk.green.bold("                                        v."),

    message_line1: text("  I'm always seeking new opportunities, my inbox"),
    message_line2: text("  is always open. Whether you have a question or"),
    message_line3: text("  just want to say hi, I will try my best to get"),
    message_line4: text("  back to you!"),
};

const questions = [
    {
        type: "list",
        name: "action",
        message: `${data.question}`,
        choices: [
            {
                name: `${data.email_q}`,
                value: () => {
                    open(`mailto:${user_email}`);
                    console.log(`${data.email_message}`);
                },
            },
            {
                name: `${data.pgp_q}`,
                value: () => {
                    open(`${pgp_pk_openpgp}`);
                    console.log(`${data.pgp_message}`);
                },
            },
            {
                name: `${data.quit_q}`,
                value: () => {
                    console.log(`${data.quit_message}`);
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
        `${data.labelDiscord}  ${data.discord}`,
        ``,
        `${data.labelPgp}`,
        `${data.pgp}`,
        ``,
        `${data.labelCard} ${data.npx}`,
        ``,
        `${data.message_line1}`,
        `${data.message_line2}`,
        `${data.message_line3}`,
        `${data.message_line4}`,
        ``,
        `${data.labelVer}  ${data.ver}`,
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