var HOST = process.env.MYSQL_HOST || "localhost";
var PORT = process.env.MYSQL_PORT || "3306";
var USER = process.env.MYSQL_USER || "root";
var PASS = process.env.MYSQL_PASSWORD || "";
var DB = process.env.MYSQL_DBNAME || "todo4";

module.exports = {
    multipleStatements: true,
    host: HOST,
    port: PORT,
    user: USER,
    password: PASS,
    database: DB,
};
