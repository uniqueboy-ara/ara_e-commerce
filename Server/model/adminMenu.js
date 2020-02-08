const mongoose = require('../bootstrap/db');

let menuSchema = mongoose.Schema({
    title: { type: String, require: true },
    rout: { type: String, require: true },
    isVisible: { type: Boolean, require: true },
});

let menuModel = mongoose.model('adminMenu', menuSchema);

module.exports = menuModel;