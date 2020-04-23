# James. A Personal Digital Assistant.
by Bengin Cetindere, Stefan Goldschmidt, Erik Littwin, Oliver Rudzinski, and Melanie Stach

## Setup
Please read each step entirely before starting to execute the step - may save you time.

### Prerequisites
1. This project runs on NodeJS V10, the probability is high that your current version of NodejS will also work, though. Download NodeJS on [the official download page](https://nodejs.org/de/download/) and install it if not installed already.
2. Install MongoDB by using [the official installation guide](https://docs.mongodb.com/manual/administration/install-community/) for your OS. **Important:** MongoDB daemon will install as a system service when not configured otherwise. If you choose the custom installation in the installer, you can choose wether you want to have it installed as a service or not. I recommend to not create a mongodb service because it will permanently drain resources and starts automatically with you OS.
3. Optional: If you want to edit and view your database graphically, use [the mongo compass](https://www.mongodb.com/products/compass)
4. Create a Telegram bot for yourself (this will be your development bot) by writing to [the BotFather](https://core.telegram.org/bots#6-botfather).

### Installation
1. Clone this project to your machine
2. Execute `npm install` inside the repository root folder
3. Create the file `.env` inside the repository root folder and add everything specified [here](https://github.com/dhbw-stg-tinf17a/ase-pda-project/wiki/Environment-Variables-needed).

## Linting
In order to have consistent code style, this project will feature a `.eslintrc.json` file in the root directory. For most IDEs there will be a linting plugin that accepts this file and applies it to the project.

## Running
1. Start the mongoDB daemon by executing `mongod` in a terminal/shell.
2. Use `npm run start-dev` to start the npm project

## Testing
**The most recent testing coverage summary can be found in `./docs/test-coverage/lcov-report/index.html`**  
1. Run command `npm run test`

# Helpful Links
- [Telegraf Documentation](https://telegraf.js.org/)
