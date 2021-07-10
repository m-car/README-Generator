const fs = require("fs");
const inquirer = require("inquirer");

questions= [
    {
      type: 'input',
      message: 'What is the title of your project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is the description of your project',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Please type installation instructions',
      name: 'installation',
    },
    {
      type: "input",
      message: 'Enter usage instructions',
      name: 'usage',
    },
    {
        type: "input",
        message:"Enter any credits you would like to add",
        name: 'credits'
    },
    {
        type: "list",
        name: "license",
        message: "Choose a license",
        choices: [
          "MIT",
          "ISC",
          "GPL v3",
          {
            name: "No License",
            value: "",
          },
        ],
      },
      {
        type: "input",
        name:"yourName",
        message: "What is your name?",
    },
      {
          type: "input",
          name:"github",
          message: "What is your github profile name?",
      },
  ];

  function renderLicenseSection(license) {
    if (license) {
      return `This project is licensed under the ${license} license.`;
    }
    return "No License";
  }

  function generateMarkdown(data){
    return `# ${data.title}
## Description
${data.description}
## Installation
${data.installation}
## Usage 
${data.usage}
## Credits
${data.credits}
## License
${renderLicenseBadge(data.license)}
${renderLicenseSection(data.license)}
## Questions
Contact me at <a href="github.com/${data.github}">${data.yourName}</a>
    `

  }
  function writeToFile(fileName, data){
      fs.writeFile(fileName, data, (err)=>{
          if (err){
              console.log(err.message);
              console.log("failed");

          }else{
              console.log("created readme.md in the project folder")
          }
      });
  }
  function renderLicenseBadge(license) {
    switch (license) {
      case "MIT":
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  
      case "ISC":
        return "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
  
      case "GPL v3":
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  
      default:
        return "";
    }
  }
  function init(){
    inquirer.prompt(questions).then((answers)=>{
      const md = generateMarkdown(answers);
      writeToFile("output/README.md", md);
    })
  }
  init();