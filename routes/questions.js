const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function (req, res) {
    db.Question.findAll().then(function (questions) {
        ret.json(questions, res);
    });
});

router.get("/:questionID", function (req, res) {
    db.Question.findByPk(req.params.questionID).then(function (question) {
        if (question) {
            ret.json(question, res);
        } else {
            res.end();
        }
    });
});

router.get("/type/:type", function (req, res) {
    db.Question.findAll({ where: { type: req.params.type } }).then(function (questions) {
        ret.json(questions, res);
    });
});

router.post("/", function (req, res) {
    db.Question.create({
        content: req.body.content,
        answer: req.body.answer,
        optionSelection1:req.body.optionSelection1,
        optionSelection2:req.body.optionSelection2,
        optionSelection3:req.body.optionSelection3,
        rightTimes: req.body.rightTimes,
        wrongTimes: req.body.wrongTimes,
        giveUpTimes: req.body.giveUpTimes
    }).then(function (question) {
        ret.json(question, res);
    });
});

router.put("/:questionID", function (req, res) {
    db.Question.findByPk(req.params.questionID).then(function (question) {
        if (question) {
            question.content = req.body.content;
            question.answer = req.body.answer;
            question.optionSelection1=req.body.optionSelection1,
            question.optionSelection2=req.body.optionSelection2,
            question.optionSelection3=req.body.optionSelection3,
            question.rightTimes=req.body.rightTimes;
            question.wrongTimes=req.body.wrongTimes;
            question.giveUpTimes=req.body.giveUpTimes;
            question.save().then(function (question) {
                ret.json(question, res)
            });
        } else {
            res.end();
        }
    });
});

router.delete("/:questionID", function (req, res) {
    db.Question.findByPk(req.params.questionID)
        .then(function (question) {
            if (question) {
                return question.destroy();
            } else {
                res.end();
            }
        })
        .then(function () {
            res.end();
        });
});

module.exports = router;
