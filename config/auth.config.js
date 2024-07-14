const config = require("./config");

module.exports = {
    JWT_SECRET_KEY: config.JWT_SECRET_KEY,
    JWT_TOKEN_EXP_TIME: config.JWT_TOKEN_EXP_TIME
}
