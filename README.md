# Employee Tracker

## Description

Here is an application for generating a professional looking README.md via prompts with questions for a user. This utilizes the packages "Inquirer", "File System (FS)", and "Colors". In addition, uses those packages with the Node language manager to generate the README markdown file using the collected data from the questions posed to the user.
  
## Installation

First to use this application head to the [Professional README Generator](https://github.com/EXCervantes/pro-README-generator) and clone the repository. To learn how to clone a repository checkout this guide [Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

You must have `node` installed on your system. Go [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) for instructions on how to do so.

Then in the Terminal run `npm install` to install both the `inquirer@8.2.4` and `colors` packages. For help on these click [here](https://www.npmjs.com/package/inquirer/v/8.2.4) for `inquirer` or [here](https://www.npmjs.com/package/colors) for `colors`. Finally to initialize this application run `node index.js` in the Terminal.
  
## Usage
  
To run the application open the Terminal or GitBash in VSCode and run `node index.js`. The application will ask a series of questions about the project using the `inquirer` package.

Once the data is entered, the application will generate a README markdown file using the code from the `generateMarkdown.js` and will write the file via `fs.writeFile` titled `DemoREADME.md`. On that README users will find a badge based on their selection for the "License" question. There is an example of a file created with this application that can be found [here](/DemoREADME.md).

### Video Demonstrating Application In Use

Here is a [link](https://drive.google.com/file/d/1eKcGoN9SfL_75I7ejRMg1LxDazqr_PpX/view?usp=drive_link) to a video demonstrating how this application works.

### Screenshots of the Application

![Screenshot 1](assets/images/employeetrackerscreen1.jpg)
![Screenshot 2](assets/images/employeetrackerscreen2.jpg)
![Screenshot 3](assets/images/employeetrackerscreen3.jpg)

## Credits

Referenced for how to display retrieved database information in a table in the terminal.

"_console: table() static method - Web APIs | MDN_. (2024, March 5). Stack Overflow. Retrieved June 21, 2024, from https://developer.mozilla.org/en-US/docs/Web/API/console/table_static
  
## License

This project is licensed under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Please see the [License](https://opensource.org/licenses/MIT) page for more info.