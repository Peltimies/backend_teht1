/*const Dbmethods = require('./Dbmethods');
const studentcode = 'ac9194';
const coursecode = 'HTS1005';
const newgrade = 3;
const addpoints = 5;

if (newgrade > 0) {
  // arvosanan lisäys ja pisteiden päivitys ovat transaktion sisällä
  conn.beginTransaction((err) => {
    if (err) {
      throw err;
    }
    Dbmethods.addGrade(studentcode, coursecode, newgrade, (err, result) => {
      if (err) {
        return conn.rollback(() => {
          // rollback = Transaktio perutaan
          throw err;
        });
      }

      Dbmethods.updateGrade(studentcode, addpoints, (err, result) => {
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
    });
  });
} else {
  Dbmethods.addGrade(studentcode, coursecode, newgrade, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Grade added!');
  });
}
*/
const Dbmethods = require('./Dbmethods');
const conn = require('./dbconnection');

const studentcode = 'ac9194';
const coursecode = 'THS1005';
const newgrade = 2;
const addedpoints = 5;

// function handleError(err) {
//   console.error(err);
//   process.exit(1);
// }

if (newgrade < 0) {
  conn.beginTransaction((err) => {
    if (err) {
      throw err;
    }
    // tee iffitys että tämä transaktio tehdään van jos tämä newgrade > 0
    // muuten jos arvosana on 0, niin lisätään vain grade, mutta ei pisteitä
    Dbmethods.addGrade(
      studentcode,
      coursecode,
      newgrade,
      function (err, result) {
        if (err) {
          // Tämä on addGrade-metodin rollback, eli se peruutetaan tällä
          return conn.rollback(() => {
            throw err;
          });
        }
        console.log(result.affectedRows + ' records inserted');
      }
    );

    Dbmethods.addPoints(studentcode, addedpoints, function (err, result) {
      if (err) {
        // Tämä on addedpoints-metodin rollback, eli se peruutetaan tällä
        return conn.rollback(() => {
          throw err;
        });
      }

      // suoritetaan transaktio lopullisesti
      conn.commit((err) => {
        if (err) {
          return conn.rollback(() => {
            throw err;
          });
        }
        console.log(addedpoints + ' points added, transaction success');
      });
    });
  });
} else {
  Dbmethods.addGrade(studentcode, coursecode, newgrade, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('grade added');
  });
}
