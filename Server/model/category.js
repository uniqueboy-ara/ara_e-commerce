const mongoose = require('../bootstrap/db');

let categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    fileName: {
        type: String,
        default: ''
    },
    isVisible: {
        type: Boolean,
        require: true,
        default: true
    },
});

let categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;