const mongoose = require('../bootstrap/db');

let userSchema = mongoose.Schema({
    name: {type: String, require: true},
    family: {type: String, require: true},
    email : {type: String, require: true},
    password: {type: String, require: true},
    city: {type: String, require: true},
    isAdmin: {type: Boolean, default: true}
});

let userModel = mongoose.model('Users',userSchema);

module.exports = userModel;