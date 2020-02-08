const express = require('express');
const router = express.Router();
const category = require('../model/category');

router.get('/', function (req, res) {
        category.find({
          isVisible: true
        }).exec().then(
          (docs) => {
            res.json(Object.assign(req.base, {
              data: docs
            }));
          },
          (err) => {
            res.json(Object.assign(req.base, {
                data: err,
              result: false
            }));
          }
        );
});

router.post('/', function (req, res) {
  let cat = category();
  cat.name = req.body.name;
  cat.description = req.body.description;
  cat.fileName = req.body.fileName;
  cat.isVisible = req.body.isVisible;

  cat.save().then(
    pass => res.json(Object.assign(req.base, {
      data: cat
    })),
    fail => res.json(Object.assign(req.base, {
      result: false
    })))
});

module.exports = router;