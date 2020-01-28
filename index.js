"use strict";

const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const userQuestions = [
  {
    type: "list",
    name: "favoriteColor",
    message: "What is your favorite color?",
    choices: ["red", "blue", "green", "black"]
  },
  {
    type: "input",
    name: "github",
    message: "What is your github username?"
  }
];
