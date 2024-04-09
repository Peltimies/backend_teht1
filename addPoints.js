const Dbmethods = require('./Dbmethods');

const studentcode = 'ac9194';
const addedpoints = 5;

Dbmethods.addPoints(studentcode, addedpoints, (err, result) => {
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
      addedpoints +
      ' points added, transaction success'
  );
});
