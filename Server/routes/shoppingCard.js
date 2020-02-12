const express = require('express');
const router = express.Router();
const shoppingCard = require('../model/shoppingCard');
const { events } = require('../util/socket-event-list')
router.get('/:id', async (req, res) => {

    try {
        let cardId = req.params.id;
        if (cardId) {
            let doc = await shoppingCard.findOne({ _id: cardId });
            res.socket.emit(events.ITEM_ADDED_TO_SHOPPING_CARD, doc)
            return res.json(Object.assign(req.base, {
                data: doc
            }));
        }
        res.json(Object.assign(req.base, {
            result: false
        }));
    }
    catch (ex) {
        console.log("TCL: ex", ex)
        res.json(Object.assign(req.base, {
            result: false,
            data: ex.message
        }));
    }
});

router.get('/:cardId/items/:productId', async (req, res) => {

    let doc = await shoppingCard.findOne({ _id: req.params.cardId });
    if (doc) {
        let product = doc.items;
        product.filter(m => m._id == req.params.productId);
        if (product.length > 0) {
            res.json(Object.assign(req.base, {
                data: doc
            }));
        } else {
            res.json(Object.assign(req.base, {
                result: false
            }));
        }
    }
    else {
        res.json(Object.assign(req.base, {
            result: false,
            data: err
        }));
    }
});

router.post('/', async (req, res, next) => {
    let card = shoppingCard();
    card.createDate = req.body.createDate;
    try {
        await card.save();
        res.json(Object.assign(req.base, {
            data: card
        }))
    }
    catch (ex) {
        res.json(Object.assign(req.base, {
            result: false,
            data: ex.message
        }))
    }
});

router.put('/', async (req, res) => {
    let doc = await shoppingCard.findOne({ _id: req.body._cardId });
    if (doc) {
        let item = doc.items.id(req.body._product._id);

        if (!item) {
            doc.items.push({
                _id: req.body._product._id,
                product: req.body._product,
                quantity: 1
            });

            try {
                res.socket.emit(events.ITEM_ADDED_TO_SHOPPING_CARD, doc)
                doc.save();
                res.json(Object.assign(req.base, {
                    data: doc
                }))
            }
            catch (ex) {
                res.json(Object.assign(req.base, {
                    result: false
                }))
            }
        } else {

            let counter = req.body._flag === 'a' ? 1 : -1;
            try {
                let item = doc.items.id(req.body._product._id);
                if (item.quantity == 1 && counter == -1)
                    doc.items.pull(req.body._product._id)
                else
                    item.quantity += counter;

                res.socket.emit(events.ITEM_ADDED_TO_SHOPPING_CARD, doc)
                await doc.save();
                res.json(Object.assign(req.base, {
                    data: doc
                }))
            }
            catch (ex) {
                res.json(Object.assign(req.base, {
                    result: false,
                    data: ex.message
                }))

            }
        }
    }
    else
        res.json(Object.assign(req.base, {
            result: false
        }));

});

module.exports = router;