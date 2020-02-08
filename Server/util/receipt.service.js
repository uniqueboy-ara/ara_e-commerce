const soap = require('soap');
const setting = require('../app-setting')

getReceiptByNumber =(receiptNo) => {
    var url = setting.ssbAddress;

    soap.createClient(url, (err, client) => {
        client.GetReceiptByNumber({ ReceiptNo: receiptNo }, (err, result) => {
            console.log("TCL: getReceiptByNumber -> result", result)
            return err ? err.body : result;
        });
    });
}

module.exports = {
    GetReceiptByNumber: getReceiptByNumber
}