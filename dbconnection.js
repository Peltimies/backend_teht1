//const mysql = require('mysql');
const { Sequelize } = require('sequelize');

/*Sijoitetaan yhteys muuttujaan conn
const conn = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'nodemysql',
});
*/
const conn = new Sequelize('nodemysql', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false, // tauluissa ei automaattisia aikaleimakenttiä
  },
});

module.exports = conn;
