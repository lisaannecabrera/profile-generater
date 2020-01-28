"use strict";

const { writeFile } = require("fs");
const { prompt } = require("inquirer");
const { get } = require("axios");

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

prompt(userQuestions).then(async ({ favoriteColor, github }) => {
  console.log(favoriteColor, github);
  try {
    const response = await get(
      `https://api.github.com/users/${github}/repos?per_page=100`
    );
    //their name, location with google maps, their github link, a blog
    //public repos, followers, github stars, who they are following

    //console.log(response.data[0]);
    const userName = response.data[0].owner.login;
    console.log(userName);
  } catch (error) {
    console.error(error);
  }
});
