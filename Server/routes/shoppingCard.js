const express = require('express');
const router = express.Router();
const shoppingCard = require('../model/shoppingCard');

router.get('/:id', function (req, res, next) {
    shoppingCard.findOne({
        _id: req.params.id
    }).exec().then(
        (doc) => {
            res.json(Object.assign(req.base, {
                data: doc
            }));
        },
        (err) => {
            res.json(Object.assign(req.base, {
                result: false
            }));
        })
});

router.get('/:cardId/items/:productId', function (req, res, next) {
    shoppingCard.findOne({
        _id: req.params.cardId
    }).exec().then(
        (doc) => {
            let product = doc ? doc.items : [{
                _id: -1
            }];
            product.filter(m => m._id === req.params.productId);
            if (product.length > 0) {
                res.json(Object.assign(req.base, {
                    data: doc
                }));
            } else {
                res.json(Object.assign(req.base, {
                    result: false
                }));
            }
        },
        (err) => {
            res.json(Object.assign(req.base, {
                result: false,
                data: err
            }));
        })
});

router.post('/', function (req, res, next) {
    let card = shoppingCard();
    card.createDate = req.body.createDate;

    card.save().then(
        pass => res.json(Object.assign(req.base, {
            data: card
        })),
        fail => res.json(Object.assign(req.base, {
            result: false
        })))
});

router.put('/', function (req, res) {
    shoppingCard.findOne({
        _id: req.body._cardId
    }).exec().then((doc) => {
            let item = doc.items.filter(m => m._id === req.body._product._id);

            if (item.length === 0) {
                doc.items.push({
                    _id: req.body._product._id,
                    product: req.body._product,
                    quantity: 1
                });

                doc.save().then(
                    pass => {
                        res.json(Object.assign(req.base, {
                            data: doc
                        }))
                    },
                    fail => {
                        res.json(Object.assign(req.base, {
                            result: false
                        }))
                    })
            } else {

                let counter = req.body._flag === 'a' ? 1 : -1;
                shoppingCard.findOneAndUpdate({
                        "_id": req.body._cardId,
                        "items._id": req.body._product._id
                    }, {
                        "$set": {
                            "items.$.quantity": item[0].quantity + counter
                        }
                    },
                    function (err, doc) {
                        if (err) {
                            res.json(Object.assign(req.base, {
                                result: false
                            }))
                        }
                        else {
                            res.json(Object.assign(req.base, {
                                data: doc
                            }))
                        }
                    }
                )
            }
        },
        (err) => {
            res.json(Object.assign(req.base, {
                result: false
            }));
        })
});

module.exports = router;