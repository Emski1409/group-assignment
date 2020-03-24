const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const db = require("../data");
const ret = require("../lib/return");

function getSearchParams(queryParams, modelFields) {
    let searchParams = {};
    modelFields.forEach(function (p) {
        p = p.toLowerCase();
        if (queryParams[p]) {
            searchParams[p] = {
                [Op.like]: "%" + queryParams[p] + "%"
            };
        }
    });
    console.log(searchParams);
    return searchParams;
}

function findAll(model, params, res) {
    model.findAll({where: params}).then(function (results) {
        if (results) {
            ret.json(results, res);
        } else {
            res.end();
        }
    });
}

router.get("/", function (req, res) {
    if (req.query.type.toLowerCase() === "tester") {
        findAll(db.Tester, getSearchParams(req.query, ["name", "score", "expression"]), res);
    } else if (req.query.type.toLowerCase() === "question") {
        findAll(db.Question, getSearchParams(req.query, ["content", "answer"]), res);
    } else if (req.query.type.toLowerCase() === "staff") {
        findAll(db.Staff, getSearchParams(req.query,["username","password"]),res);
    } else {
        res.end();
    };
});

module.exports = router;
