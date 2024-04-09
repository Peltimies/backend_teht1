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

  addGrade(studentcode, coursecode, grade, callback) {
    return conn.beginTransaction(function (err) {
  },
  addPoints(studentcode, addedpoints, conn) {
    return conn.query(
      'update Students set studypoints = ? where studentcode = ?',
      [studentcode, addedpoints],
      callback
    );
  },

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
