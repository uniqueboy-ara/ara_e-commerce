const express = require('express');
const router = express.Router();
const users = require('../model/user');
const verify = require('./SecureModule');
const secureDataLoad = require('./SecureDataLoadModule');

router.route('/')
  .get(function (req, res) {
    secureDataLoad(users, req, res);
  })
  .post(async (req, res) => {
    let user = users();
    user.name = req.body.name;
    user.family = req.body.family;
    user.email = req.body.email;
    user.password = req.body.password;
    user.city = req.body.city;
    user.isAdmin = req.body.isAdmin;
    try {
      await user.save();
      res.json(Object.assign(req.base, {
        data: user
      }));
    }
    catch (ex) {
      res.json(Object.assign(req.base, {
        data: ex.message,
        result: false
      }));
    }
  });

module.exports = router;