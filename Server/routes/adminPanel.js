const express = require('express');
const router = express.Router();
const adminPanel = require('../model/adminMenu');
const verify = require('./SecureModule');
const secureDataLoad = require('./SecureDataLoadModule');
const fs = require('fs')

// router.get('/', verify, function (req, res, next) {

//     secureDataLoad(adminPanel, req, res);
// });
router.route('/')
    .get(function (req, res, next) {
        secureDataLoad(adminPanel, req, res);
    })
    .post(async (req, res) => {
        let admin = adminPanel();
        admin.title = req.body.title;
        admin.rout = req.body.rout;

        try {
            await admin.save();
            res.json(Object.assign(req.base, {
                data: admin
            }));
        }
        catch (ex) {
            res.json(Object.assign(req.base, {
                data: ex.message,
                result: false
            }));
        }
    })
router.route('/upload/:fileName?/:type?')
    .post((req, res) => {
        console.log(req.body);
        if (req.files) {
            for (file in req.files) {
                let ext = req.files[file].name.split('.');
                let filePath = `./www/img/${req.body.type}/` + req.files[file].md5 + '.' + ext[ext.length - 1];
                req.files[file].mv(filePath, async (err, result) => {
                    if (err)
                        return res.json(Object.assign(req.base, {
                            result: false,
                            data: err
                        }))
                    try {
                        return res.json(Object.assign(req.base, {
                            data: [req.files[file].md5 + "." + ext[ext.length - 1]]
                        }))
                    }
                    catch (ex) {
                        fs.unlinkSync(filePath)
                        return res.json(Object.assign(req.base, {
                            result: false,
                            data: Log(ex)
                        }))
                    }
                })
            }
        }
        else
            res.json(Object.assign(req.base, {
                result: false
            }))
    })
    .delete((req, res) => {
        console.log(req.params);
        try {
            let filePath = `./www/img/${req.params['type']}/${req.params['fileName']}`;
            fs.unlinkSync(filePath)
            res.json(Object.assign(req.base, {
                result: true
            }))
        }
        catch{
            res.json(Object.assign(req.base, {
                result: false
            }))
        }
    })

module.exports = router;
