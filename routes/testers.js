const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function (req, res) {
    db.Tester.findAll().then(function (testers) {
        ret.json(testers, res)
    });
});

router.get("/:testerID", function (req, res) {
    db.Tester.findByPk((req.params.testerID)).then(function (tester) {
        if (tester) {
            ret.json(tester, res)
        } else {
            res.end();
        }
        ;
    });
});

router.post("/", function (req, res) {
    db.Tester.create({
        name: req.body.name,
        score: req.body.score,
        expression: req.body.expression
    }).then(function (tester) {
        ret.json(tester, res);
    })
});

router.put("/:testerID", function (req, res) {
    db.Tester.findByPk(req.params.testerID).then(function (tester) {
        if (tester) {
            tester.name = req.body.name;
            tester.score = req.body.score;
            tester.expression = req.body.expression;
            tester.save().then(function (tester) {
                ret.json(tester, res)
            });
        } else {
            res.end();
        }
    });
});

router.delete("/:testerID", function (req, res) {
    db.Tester.findByPk(req.params.testerID)
        .then(function (tester) {
            if (tester) {
                return tester.destroy();
            } else {
                res.end();
            }
        })
        .then(function () {
            res.end();
        });
});

module.exports = router;