# Setup
Please read each step entirely before starting to execute the step - may save you time.

## Prerequisites
1. This project runs on NodeJS V10, the probability is high that your current version of NodejS will also work, though. Download NodeJS on [the official download page](https://nodejs.org/de/download/) and install it if not installed already.
2. Install MongoDB by using [the official installation guide](https://docs.mongodb.com/manual/administration/install-community/) for your OS. **Important:** MongoDB daemon will install as a system service when not configured otherwise. If you choose the custom installation in the installer, you can choose wether you want to have it installed as a service or not. I recommend to not create a mongodb service because it will permanently drain resources and starts automatically with you OS.
3. Optional: If you want to edit and view your database graphically, use [the mongo compass](https://www.mongodb.com/products/compass)

## Installation
1. Clone this project to your machine
2. Execute `npm install` inside the repository root folder

## Linting
In order to have consistent code style, this project will feature a `.eslintrc.json` file in the root directory. For most IDEs there will be a linting plugin that accepts this file and applies it to the project.

## Running
1. Start the mongoDB daemon by executing `mongod` in a terminal/shell.
2. Use `npm run start-dev` to start the npm project

## Testing
Soon.
