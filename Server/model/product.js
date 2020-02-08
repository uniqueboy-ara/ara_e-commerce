const mongoose = require('../bootstrap/db')

let productSchema = mongoose.Schema({
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
    fileName: {
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

let productModel = mongoose.model('product', productSchema);

module.exports = productModel;