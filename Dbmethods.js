const conn = require('./dbconnection');

// Dbmethods on olio, jonka sisällä on funktioita, eli olion metodeita
const Dbmethods = {
  add(studentcode, name, email, studypoints, callback) {
    return conn.query(
      'insert into Students set studentcode = ?, name = ?, email = ?, studypoints = ?',
      [studentcode, name, email, studypoints],
      callback
    );
  },
  // Tee tähän muut metodit
  findAll(callback) {
    return conn.query('select * from Students', callback);
  },
  findBel100: function (callback) {
    return conn.query('select * from Students where studypoints < ?', callback);
  },

  /*
      addPoints(studentcode, (error) => {
        if (error) {
          conn.rollback(() => {
            throw new Error(error);
          });
        }
      });
      conn.commit((error) => {
        if (error) {
          conn.rollback(() => {
            throw new Error(error);
          });
        }
      });
      console.log('Success!');
    });
  },
*/

  addPoints(studentcode, pointsToAdd, callback) {
    return conn.query(
      'update Students set studypoints = studypoints + ?, where studentcode = ?',
      [pointsToAdd, studentcode],
      callback
    );
  },

  addGrade(studentcode, coursecode, grade, pointsToAdd, callback) {
    return conn.beginTransaction(function (err) {
      if (err) {
        return callback(err, null);
      }
      conn.query(
        'INSERT INTO Grades SET studentcode = ?, grade = ?, coursecode = ?',
        [studentcode, grade, coursecode],
        (error, result) => {
          if (error) {
            return conn.rollback(() => {
              throw new Error(error);
            });
          }
          callback(result);
        }
      );

      addPoints(studentcode, pointsToAdd, (error) => {
        if (error) {
          conn.rollback(() => {
            throw new Error(error);
          });
        }
      });
      conn.commit((error) => {
        if (error) {
          conn.rollback(() => {
            throw new Error(error);
          });
        }
      });
      console.log('Success!');
    });
  },
  /*
  addGrade(studentcode, coursecode, grade, callback) {
    return conn.beginTransaction(function (err) {
      if (err) {
        return callback(err, null);
      }
      conn.query(
        'INSERT INTO Grades SET studentcode = ?, grade = ?, coursecode = ?',
        [studentcode, grade, coursecode],
        (error, result) => {
          if (error) {
            return conn.rollback(() => {
              throw new Error(error);
            });
          }
          callback(result);
        }
      );

      this.addPoints(studentcode, (error) => {
        if (error) {
          conn.rollback(() => {
            throw new Error(error);
          });
        }
      });
      conn.commit((error) => {
        if (error) {
          conn.rollback(() => {
            throw new Error(error);
          });
        }
      });
      console.log('Success!');
    });
  },
*/

  del(studentcode, name, email, studypoints, callback) {
    return conn.query(
      'delete from Students WHERE studentcode = ?',
      [studentcode],
      callback
    );
  },
  deleteGrade(studentcode, callback) {
    return conn.query(
      'delete FROM Grades WHERE studentcode = ?',
      [studentcode],
      callback
    );
  },
  updateGrade(studentcode, studypoints, callback) {
    return conn.query(
      'update Students set studypoints = ? WHERE studentcode = ?',
      [studentcode, studypoints],
      callback
    );
  },
};
module.exports = Dbmethods;
