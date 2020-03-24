const path = require("path");
const Sequelize = require("sequelize");

const db = require("./data");

// Add some dummy data to the database - in practice this should be in a different file
function addData() {
    let question1 = db.Question.create({
        content: "What is your name?",
        answer: "pengxiao",
        optionSelection1:"Eliot",
        optionSelection2:"Wanglu",
        optionSelection3:"Emma",
        rightTimes: 2,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question2 = db.Question.create({
        content: "What is your favorite game",
        answer: "league of legend",
        optionSelection1:"Dota",
        optionSelection2:"Dota2",
        optionSelection3:"Pokeman",
        rightTimes: 2,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question3 = db.Question.create({
        content: "What is the age",
        answer: 18,
        optionSelection1:19,
        optionSelection2:17,
        optionSelection3:16,
        rightTimes: 1,
        wrongTimes: 1,
        giveUpTimes: 0,
        type: 1
    });

    let question4 = db.Question.create({
        content: "What is the country",
        answer: "The United Kingdom",
        optionSelection1:"China",
        optionSelection2:"India",
        optionSelection3:"Australia",
        rightTimes: 1,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question5 = db.Question.create({
        content: "What is the sex",
        answer: "man",
        optionSelection1:"woman",
        optionSelection2:"neutral",
        optionSelection3:"unknown",
        rightTimes: 0,
        wrongTimes: 2,
        giveUpTimes: 0,
        type: 1
    });

    let question6 = db.Question.create({
        content: "What is the hobby",
        answer: "Codding",
        optionSelection1:"Basketball",
        optionSelection2:"Kettle bell",
        optionSelection3:"Football",
        rightTimes: 0,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question7 = db.Question.create({
        content: "What is the degree",
        answer: "postgraduate",
        optionSelection1:"Undergraduate",
        optionSelection2:"Phd",
        optionSelection3:"Secondary",
        rightTimes: 0,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question8 = db.Question.create({
        content: "What is the course",
        answer: "computing",
        optionSelection1:"Data analysis",
        optionSelection2:"Computer science",
        optionSelection3:"Machine Learning",
        rightTimes: 0,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question9 = db.Question.create({
        content: "What is the favorite country",
        answer: "China",
        optionSelection1:"The United Kingdom",
        optionSelection2:"Iceland",
        optionSelection3:"Denmark",
        rightTimes: 0,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question10 = db.Question.create({
        content: "When is your birthday year",
        answer: 1996,
        optionSelection1:1997,
        optionSelection2:1998,
        optionSelection3:1999,
        rightTimes: 0,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 1
    });

    let question11 = db.Question.create({
        content: "The cat sat on the ___",
        answer: "mat",
        rightTimes: 0,
        wrongTimes: 0,
        giveUpTimes: 0,
        type: 2
    });

    let tester1 = db.Tester.create({
        name: "Stephen Curry",
        score: 6,
        expression: "pass"
    });

    let tester2 = db.Tester.create({
        name: "Lebron James",
        score: 8,
        expression: "merit"
    });

    let staff1 = db.Staff.create({
        username: "staff1",
        password: 123456789
    });

    // wait for all the objects to save and then instantiate relationships.
    Promise
        .all([question1, question2, question3, question4,
            question5, question6, question7, question8, question9,
            question10, question11, tester1, tester2, staff1])
        .then(function (results) {
            q1 = results[0];
            q2 = results[1];
            q3 = results[2];
            q4 = results[3];
            q5 = results[4];
            q6 = results[5];
            q7 = results[6];
            q8 = results[7];
            q9 = results[8];
            q10 = results[9];
            t1 = results[10];
            t2 = results[11];
            s1 = results[12];
    });
};

db.initialiseDatabase(true, addData);
