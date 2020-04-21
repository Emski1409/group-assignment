const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function (req, res) {
    db.Question1.findAll().then(function (question1) {
        ret.json(question1, res)
    });
});

router.get("/:question1ID", function (req, res) {
    db.Question1.findByPk((req.params.question1ID)).then(function (question1) {
        if (question1) {
            ret.json(question1, res)
        } else {
            res.end();
        }

    });
});

router.post("/", function (req, res) {
    db.Question1.create({
        string1: req.body.string1,
        option1: req.body.option1,
        string2: req.body.string2,
        option2: req.body.option2,
        string3: req.body.string3,
        option3: req.body.option3,
        string4: req.body.string4,
        option4: req.body.option4,
        string5: req.body.string5,
        rightTimes: req.body.rightTimes,
        wrongTimes: req.body.wrongTimes,
        giveUpTimes: req.body.giveUpTimes
    }).then(function (tester) {
        ret.json(tester, res);
    })
});

router.put("/:question1ID", function (req, res) {
    db.Question1.findByPk(req.params.question1ID).then(function (question1) {
        if (question1) {
          question1.string1 = req.body.string1;
          question1.option1 = req.body.option1;
          question1.string2 = req.body.string2;
          question1.option2 = req.body.option2;
          question1.string3 = req.body.string3;
          question1.option3 = req.body.option3;
          question1.string4 = req.body.string4;
          question1.option4 = req.body.option4;
          question1.string5 = req.body.string5;
          question1.rightTimes = req.body.rightTimes;
          question1.wrongTimes = req.body.wrongTimes;
          question1.giveUpTimes = req.body.giveUpTimes;
            question1.save().then(function (question1) {
                ret.json(question1, res)
            });
        } else {
            res.end();
        }
    });
});

router.delete("/:question1ID", function (req, res) {
    db.Question1.findByPk(req.params.question1ID)
        .then(function (question1) {
            if (question1) {
                return question1.destroy();
            } else {
                res.end();
            }
        })
        .then(function () {
            res.end();
        });
});

module.exports = router;
