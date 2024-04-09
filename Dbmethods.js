const conn = require('./dbconnection');

// Dbmethods on olio, jonka sisällä on funktioita, eli olion metodeita
const Dbmethods = {
  add(studentcode, name, email, studypoints, callback) {
    return conn.query(
      'INSERT INTO Students set studentcode = ?, name = ?, email = ?, studypoints = ?',
      [studentcode, name, email, studypoints],
      callback
    );
  },
  // Tee tähän muut metodit
  findAll(callback) {
    return conn.query('select * from Students', callback);
  },
  findBel(below, callback) {
    return conn.query(
      'SELECT * FROM Students where studypoints < ?',
      [below],
      callback
    );
  },

  addGrade(studentcode, coursecode, grade, callback) {
    return conn.query(
      'INSERT INTO Grades SET studentcode = ?, grade = ?, coursecode = ?',
      [studentcode, grade, coursecode],
      callback
    );
  },

  updatePoints(studentcode, pointsToAdd, callback) {
    return conn.query(
      'UPDATE Students SET studypoints = studypoints + ? WHERE studentcode = ?',
      [pointsToAdd, studentcode],
      callback
    );
  },

  del(studentcode, callback) {
    return conn.query(
      'DELETE from Students WHERE studentcode = ?',
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
  updateGrade(studentcode, coursecode, newgrade, callback) {
    return conn.query(
      'UPDATE Grades SET grade = ? WHERE studentcode = ? AND coursecode = ?',
      [newgrade, studentcode, coursecode],
      callback
    );
  },
};
module.exports = Dbmethods;
