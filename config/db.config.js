const config = require("./config");

module.exports = {
    HOST: config.DB_HOST,
    USER : config.DB_USER_NAME,
    port: config.DB_PORT,
    PASSWORD : config.DB_PSWD, 
    DB : config.DB_NAME,
    dialect : config.DB_DIALECT,
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
}
