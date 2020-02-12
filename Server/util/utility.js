const fs = require('fs');
const Log = require('./Logger');
const User = require('../models/user.model');

map = (source, dest, excludeList = []) => {
    let propertyList = Object.getOwnPropertyNames(source).filter(m => !excludeList.includes(m));
    propertyList.forEach(p => {
        dest[p] = source[p];
    })
}

loadText = (filePath) => {
    return fs.readFileSync(filePath, { encoding: 'utf-8' })
}

sendResponse = (req, res, data, result = true, code = 200) => {

    req.body.status = code;
    req.body.to = req.body.from;
    req.body.data = data;
    delete req.body.from;

    Log({ type: result ? 'info' : 'error', res: req.body })
    res.status(code).json(
        Object.assign(req.base, {
            result: result,
            data: Array.isArray(data) ? data : [data]
        }))
}

async function userHasPermission(userInfo, ruleName, accessLevel) {

    let doc = await User.findOne({
        _id: userInfo.id,
        isDeleted: false
    }).populate('accessLevel');
    //console.log("doc", doc);

    if (doc) {
        if (doc.active) {
            if (doc.accessLevel.title == "Admin-Access") {
                return true;
            }
            else {
                let Rules = doc['accessLevel'].rules.find(function (item) {
                    return item.name == ruleName;
                });
                if (Rules != undefined) {
                    let hasAccessPermission = Rules.value.find(function (item) {
                        return item == accessLevel.toLowerCase();
                    });
                    if (hasAccessPermission != undefined) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

module.exports = {
    Map: map,
    LoadText: loadText,
    SendResponse: sendResponse,
    UserHasPermission: userHasPermission
}