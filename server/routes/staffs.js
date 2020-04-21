const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function (req, res) {
    db.Staff.findAll().then(function (staffs) {
        ret.json(staffs, res)
    });
});

router.get("/:staffID", function (req, res) {
    db.Staff.findByPk((req.params.testerID)).then(function (staff) {
        if (staff) {
            ret.json(staff, res)
        } else {
            res.end();
        };
    });
});

router.post("/", function (req, res) {
    db.Staff.create({username: req.body.username, answer: req.body.password}).then(function (staff) {
        ret.json(staff, res);
    });
});

router.delete("/:staffID", function (req, res) {
    db.Question.findByPk(req.params.staffID)
        .then(function (staff) {
            if (staff) {
                return staff.destroy();
            } else {
                res.end();
            }
        })
        .then(function () {
            res.end();
        });
});

module.exports = router;