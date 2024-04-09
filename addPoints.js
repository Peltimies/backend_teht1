const Dbmethods = require('./Dbmethods');
const conn = require('./dbconnection');
const studentcode = 'ac9194';
const pointsToAdd = 5;

Dbmethods.addPoints(studentcode, pointsToAdd, (err, result) => {
  if (err) {
    //tämä on addpoints metodin rollback eli se perutetaan tällä
    return conn.rollback(() => {
      throw err;
    });
  }
  //suoritetaan lopullisesti transaktio
  conn.commit(function (err) {
    if (err) {
      return conn.rollback(function () {
        throw err;
      });
    }
  });
  console.log(
    result.affectedRows +
      ' ' +
      pointsToAdd +
      ' points added, transaction success'
  );
});
module.exports = pointsToAdd;
