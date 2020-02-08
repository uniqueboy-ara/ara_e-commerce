const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = function LoadSecureData(tableName, req, res) {
    // fs.readFile('./public/private.key', 'utf8', (error, key) => {
    //     jwt.verify(req.token, key, (err, data) => {
    //         if (err)
    //             res.sendStatus(403);
    //         else {
    tableName.find().exec().then(
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
    //         }
    //     })
    // });
};