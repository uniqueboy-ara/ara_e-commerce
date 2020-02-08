const express = require('express');
const fs = require('fs');
const router = express.Router();
const users = require('../model/user');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res) {

    users.findOne({
        email: req.body.Email,
        password: req.body.Password
    }).exec().then(
        (user) => {
            if (user) {
                fs.readFile('./public/private.key', 'utf8', (err, data) => {
                    let token = jwt.sign({
                        user
                    }, data);
                    res.status(200).json(Object.assign(req.base, {
                        data: user,
                        token: token
                    }));
                });
            } else {
                console.log('else');
                res.status(404).json({
                    result: false,
                    data: {},
                    token: null
                });
            }
        },
        (err) => {
            res.status(404).json({
                result: false,
                data: err,
                token: null
            });
        }
    );
});

module.exports = router;