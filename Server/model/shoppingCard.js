const mongoose = require('../bootstrap/db');

let productSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    caption: {
        type: String,
        require: true
    },
    url: {
        type: String,
        default: ''
    },
    likeCount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    isVisible: {
        type: Boolean,
        require: true,
        default: true
    },
});

let itemsSchema = mongoose.Schema({
    _id: String,
    product: productSchema,
    quantity: {
        type: Number,
        default: 1
    }
});

let cardSchema = mongoose.Schema({
    createDate: {
        type: String,
        require: true
    },
    items: [itemsSchema]
});

let cardModel = mongoose.model('shoppingCard', cardSchema);

module.exports = cardModel;