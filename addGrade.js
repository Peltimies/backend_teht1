const Dbmethods = require('./Dbmethods');

const conn = require('./dbconnection');
const studentcode = 'ac9194';
const coursecode = 'HTS1005';
const newgrade = 3;
const pointsToAdd = 5;

if (newgrade > 0) {
  // arvosanan lisäys ja pisteiden päivitys ovat transaktion sisällä
  conn.beginTransaction((err) => {
    if (err) {
      throw err;
    }
    Dbmethods.addGrade(
      studentcode,
      coursecode,
      newgrade,
      pointsToAdd,
      (err, result) => {
        if (err) {
          return conn.rollback(() => {
            // rollback = Transaktio perutaan
            throw err;
          });
        }

        Dbmethods.updateGrade(studentcode, pointsToAdd, (err, result) => {
          if (err) {
            return conn.rollback(() => {
              throw err;
            });
          }
          conn.commit(function (err) {
            if (err) {
              return conn.rollback(() => {
                throw err;
              });
            }
            console.log('Grade added, student updated!');
          });
        });
      }
    );
  });
} else {
  Dbmethods.addGrade(studentcode, coursecode, newgrade, (err, result) => {
    if (err) {
      throw err;
    }
    return result;
  });
}
