const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(__dirname, `../.env`),
});

console.log("SERVER ENV : " + process.env.NODE_ENV);

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,

    DB_HOST: process.env.DB_HOST,
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_PSWD: process.env.DB_PSWD,
    DB_NAME: process.env.DB_NAME,
    DB_DIALECT: process.env.DB_DIALECT,

    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_TOKEN_EXP_TIME: process.env.JWT_TOKEN_EXP_TIME
};
