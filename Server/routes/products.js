const express = require('express');
const router = express.Router();
const product = require('../model/product');
const verify = require('./SecureModule');
const secureDataLoad = require('./SecureDataLoadModule');
const fs = require('fs');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {

    if (req.query.category) {

        product.find({
            category: req.query.category
        }).exec().then(
            (docs) => {
                res.json(Object.assign(req.base, {
                    data: docs
                }));
            },
            (err) => {
                res.json(Object.assign(req.base, {
                    result: false,
                    data: err
                }));
            }
        );
    }
    else
        product.find({}).exec().then(
            (docs) => {
                res.json(Object.assign(req.base, {
                    data: docs
                }));
            },
            (err) => {
                res.json(Object.assign(req.base, {
                    result: false,
                    data: err
                }));
            }
        );
});

router.get('/:id', verify, function (req, res) {

    fs.readFile('./public/private.key', 'utf8', (error, key) => {

        jwt.verify(req.token, key, (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                product.findOne({
                    _id: req.params.id
                }).exec().then(
                    (docs) => {
                        res.json(Object.assign(req.base, {
                            data: docs
                        }));
                    },
                    (err) => {
                        res.json(Object.assign(req.base, {
                            result: false,
                            data: err
                        }));
                    });
            }
        });
    });
});

router.post('/', (req, res) => {

    let newproduct = product();
    newproduct.name = req.body.name;
    newproduct.caption = req.body.caption;
    newproduct.fileName = req.body.fileName;
    newproduct.category = req.body.category;
    newproduct.price = req.body.price;
    console.log(newproduct);
    newproduct.save().then(
        pass => res.json(Object.assign(req.base, {
            data: newproduct
        })),
        fail => res.json(Object.assign(req.base, {
            result: false
        })))
});

router.put('/', (req, res) => {

    product.findOne({
        _id: req.body.id
    }).exec().then(p => {
        let updateData = req.body.product;
        p.name = updateData.name;
        p.caption = updateData.caption;
        p.fileName = updateData.fileName;
        p.category = updateData.category;
        p.price = updateData.price;
        p.save().then(
            pass => res.json(Object.assign(req.base, {
                data: p
            })),
            fail => res.json(Object.assign(req.base, {
                result: false
            })))
    })
});

router.delete('/:id', (req, res) => {
    product.findOne({
        _id: req.params.id
    }).remove().exec().then(
        pass => res.json(Object.assign(req.base, {
            result: true
        })),
        fail => res.json(Object.assign(req.base, {
            result: false
        })))
});

module.exports = router;