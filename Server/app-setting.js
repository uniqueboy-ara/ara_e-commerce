module.exports = {
    portNo: 3000,
    db: {
        mongo: {
            main: {
                name: 'e-commerce',
                address: '127.0.0.1:27017'
            },
            log: {
                name: 'e-commerce_log',
                address: '127.0.0.1:27017'
            }
        },
        sqlConfig: {
            driver: 'mssql',
            config: {
                user: 'dev',
                password: 'sin@',
                server: '10.0.0.11',
                database: 'BCTS980412'
            }
        }
    },
    jwtExpireTime: 3000,
    ssbAddress: 'http://10.1.102.26:8091/SSB/BCTS/CCS.svc?wsdl',
    tokenHashKey: '8c10%$#f9be0b053082',
    jwtSecret: "This is Private key. It is used in authentication security and pricacy."


}
