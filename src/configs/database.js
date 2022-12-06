require("dotenv").config();
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME } = process.env;

let HOST = MYSQL_HOST;
let USER = MYSQL_USER;
let PASS = MYSQL_PASSWORD;
let DB = MYSQL_DBNAME;

module.exports = {
    multipleStatements: true,
    host: HOST,
    user: USER,
    password: PASS,
    database: DB,
};
