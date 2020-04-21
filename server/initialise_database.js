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
        giveUpTimes: 0
    });

    let question2 = db.Question.create({
        content: "What is your favorite game",
        answer: "league of legend",
        optionSelection1:"Dota",
        optionSelection2:"Dota2",
        optionSelection3:"Pokeman",
        rightTimes: 2,
        wrongTimes: 0,
        giveUpTimes: 0
    });

    let question3 = db.Question.create({
        content: "What is the age",
        answer: 18,
        optionSelection1:19,
        optionSelection2:17,
        optionSelection3:16,
        rightTimes: 1,
        wrongTimes: 1,
        giveUpTimes: 0
    });

    let question4 = db.Question.create({
        content: "What is the country",
        answer: "The United Kingdom",
        optionSelection1:"China",
        optionSelection2:"India",
        optionSelection3:"Australia",
        rightTimes: 1,
        wrongTimes: 0,
        giveUpTimes: 0
    });

    let question5 = db.Question.create({
        content: "What is the sex",
        answer: "man",
        optionSelection1:"woman",
        optionSelection2:"neutral",
        optionSelection3:"unknown",
        rightTimes: 0,
        wrongTimes: 2,
        giveUpTimes: 0
    });

    let question6 = db.Question.create({
        content: "What is the hobby",
        answer: "Codding",
        optionSelection1:"Basketball",
        optionSelection2:"Kettle bell",
        optionSelection3:"Football",
        rightTimes: 2,
        wrongTimes: 2,
        giveUpTimes: 2
    });

    let question7 = db.Question.create({
        content: "What is the degree",
        answer: "postgraduate",
        optionSelection1:"Undergraduate",
        optionSelection2:"Phd",
        optionSelection3:"Secondary",
        rightTimes: 0,
        wrongTimes: 3,
        giveUpTimes: 4
    });

    let question8 = db.Question.create({
        content: "What is the course",
        answer: "computing",
        optionSelection1:"Data analysis",
        optionSelection2:"Computer science",
        optionSelection3:"Machine Learning",
        rightTimes: 2,
        wrongTimes: 3,
        giveUpTimes: 4
    });

    let question9 = db.Question.create({
        content: "What is the favorite country",
        answer: "China",
        optionSelection1:"The United Kingdom",
        optionSelection2:"Iceland",
        optionSelection3:"Denmark",
        rightTimes: 8,
        wrongTimes: 1,
        giveUpTimes: 0
    });

    let question10 = db.Question.create({
        content: "When is your birthday year",
        answer: 1996,
        optionSelection1:1997,
        optionSelection2:1998,
        optionSelection3:1999,
        rightTimes: 5,
        wrongTimes: 2,
        giveUpTimes: 0
    });

    let question11 = db.Question1.create({
      content: "basic addition",
      string1: "2+2 is",
      option1: 4,
      string2: ".  3+3 is",
      option2: 6,
      string3: ".  4+4 is",
      option3: 8,
      string4: ".  5+5 is",
      option4: 10,
      string5: ".",
      rightTimes: 3,
      wrongTimes: 2,
      giveUpTimes: 4
    });

    let question12 = db.Question1.create({
      content: "some multiplication",
      string1: "2-2 is",
      option1: 0,
      string2: ".  3x3 is",
      option2: 9,
      string3: ".  4x4 is",
      option3: 16,
      string4: ".  5x5 is",
      option4: 25,
      string5: ".",
      rightTimes: 6,
      wrongTimes: 2,
      giveUpTimes: 0
    });

    let question13 = db.Question1.create({
      content: "this time with spelling",
      string1: "2+two is",
      option1: 'four',
      string2: ".  3+three is",
      option2: 'six',
      string3: ".  4+four is",
      option3: 'eight',
      string4: ".  5+five is",
      option4: 'ten',
      string5: ".",
      rightTimes: 3,
      wrongTimes: 2,
      giveUpTimes: 4
    });

    let question14 = db.Question1.create({
      content: "language questions",
      string1: "hello is a",
      option1: 'greeting',
      string2: ".  beautiful is an",
      option2: 'adjective',
      string3: ".  walking is a",
      option3: 'verb',
      string4: ".  dog is an",
      option4: 'animal',
      string5: ".",
      rightTimes: 3,
      wrongTimes: 2,
      giveUpTimes: 4
    });

    let question15 = db.Question1.create({
      content: "opinion questions",
      string1: "chocolate is",
      option1: 'nice',
      string2: ".  bovril is",
      option2: 'not nice',
      string3: ".  football is",
      option3: 'fun',
      string4: ".  cricket is",
      option4: 'boring',
      string5: ".",
      rightTimes: 3,
      wrongTimes: 2,
      giveUpTimes: 4
    });



    let staff1 = db.Staff.create({
        username: "staff1",
        password: 123456789
    });

    // wait for all the objects to save and then instantiate relationships.
    Promise
        .all([question1, question2, question3, question4,
            question5, question6, question7, question8, question9,
            question10, question11, staff1])
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
            s1 = results[12];
    });
};

db.initialiseDatabase(true, addData);
