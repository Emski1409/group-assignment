const path = require("path");
const Sequelize = require("sequelize");

const dataDir = path.join(__dirname, "data");

// initialise a database connection
const sequelize = new Sequelize("libraryDB", null, null, {
    dialect: "sqlite",
    storage: path.join(dataDir, "questionnaire.sqlite")
});

// connect to the database
sequelize.authenticate().then(
    function () {
        console.log("Connection has been established successfully.");
    },
    function (err) {
        console.log("Unable to connect to the database:", err);
    }
);

//  MODELS

// Question has a content and an answer
const Question = sequelize.define("Question", {
    content: Sequelize.STRING,
    answer: Sequelize.STRING,
    optionSelection1:Sequelize.STRING,
    optionSelection2:Sequelize.STRING,
    optionSelection3:Sequelize.STRING,
    rightTimes:Sequelize.STRING,
    wrongTimes:Sequelize.STRING,
    giveUpTimes:Sequelize.STRING,
    type: Sequelize.INTEGER
});

// Tester has a name and his score for the questionnaire
const Tester = sequelize.define("Tester", {
    name: Sequelize.STRING,
    score: Sequelize.STRING,
    expression: Sequelize.STRING
});

const Staff = sequelize.define("Staff", {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});


//  SYNC SCHEMA
const initialiseDatabase = function (wipeAndClear, repopulate) {
    sequelize.sync({force: wipeAndClear}).then(
        function () {
            console.log("Database Synchronised");
            if (repopulate) {
                repopulate();
            }
        },
        function (err) {
            console.log("An error occurred while creating the tables:", err);
        }
    );
};

module.exports = {
    initialiseDatabase,
    Question,
    Tester,
    Staff
};