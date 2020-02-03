"use strict";

const { writeFile } = require("fs");
const { prompt } = require("inquirer");
const { get } = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(writeFile);
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

// prompt(userQuestions).then(async ({ favoriteColor, github }) => {
//   console.log(favoriteColor, github);
//   try {
//     const response = await get(`https://api.github.com/users/${github}`);
//     const repos = await get(`https://api.github.com/users/${github}/starred`);

//     const userName = response.data;
//     console.log(userName);
//     const starCount = repos.data.length;
//     console.log(starCount);
//   } catch (error) {
//     console.error(error);
//   }
function generateHTML(response, starCount) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>Document</title>
      <style>
      .container { background-color: ${userQuestions.choices};}
       </style>
    </head>
    <body>
      <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Hi! My name is ${response.data.name}</h1>
        <p class="lead">I am from ${response.data.location}.</p>
        <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
        <ul class="list-group">
          <li class="list-group-item">My GitHub username is ${response.data.loggin}</li>
          <li class="list-group-item">Starred: ${starCount}</li>
          <li class="list-group-item">Location: ${response.data.location}</li>
          <li class-"list-group-item">Blog: ${response.data.blog}</li>
        </ul>
      </div>
    </div>
    </body>
    </html>`;
}

async function init() {
  console.log("initializing...");
  try {
    const { favoriteColor, github } = await prompt(userQuestions);
    const response = await get(`https://api.github.com/users/${github}`);
    const repos = await get(`https://api.github.com/users/${github}/starred`);

    const userName = response.data;
    console.log(userName);
    const starCount = repos.data.length;
    console.log(starCount);
    const html = generateHTML(response, starCount);

    await writeFileAsync("index.html", html, "utf8");
    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.error(err);
  }
}
init();
