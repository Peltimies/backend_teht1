/*
 * Testataan että mysql:n perustoiminnot toimivat
 */
// kantayhteys otetaan dbconnection.js -tiedostossa joka on sisällytetty
// require-lauseella Dbmethods.js -tiedostoon
const Dbmethods = require('../Dbmethods');
const expect = require('chai').expect;

describe('Testing mysql', () => {
  it('should save data to test database', (done) => {
    Dbmethods.add(
      'x1234',
      'Testi Opiskelija',
      'x1234@jamk.fi',
      0,
      function (err, result) {
        if (err) {
          throw err;
        }
        console.log(result.affectedRows + ' records inserted');
        done();
      }
    );
  });

  it('should retrieve correct data from test database', (done) => {
    Dbmethods.findAll((err, students) => {
      if (err) {
        throw err;
      }
      if (students.length === 0) {
        throw new Error('No students in database!');
      }
      expect(students[students.length - 1]).to.have.property('studentcode');
      expect(students[students.length - 1].studentcode).to.equal('x1234');
      done();
    });
  });

  it('should add grade to test database', (done) => {
    Dbmethods.addGrade('x1234', 'HTS1008', 5, (err, grades) => {
      if (err) {
        throw err;
      }
      if (grades.length === 0) {
        throw new Error('No grades in database!');
      }
      expect(grades[grades.length - 1]).to.have.property('studentcode');
      expect(grades[grades.length - 1].studentcode).to.equal('x1234');
      expect(grades[grades.length - 1]).to.have.property('coursecode');
      expect(grades[grades.length - 1].studentcode).to.equal('HTS1008');
      expect(grades[grades.length - 1]).to.have.property('grade');
      expect(grades[grades.length - 1].studentcode).to.equal(5);
      done();

      // Now, you can check if the grade has been added by querying the database
      // and verifying the result. This depends on how your database schema is structured.
    });
  });
  /*
  it('should delete grade from test database', (done) => {
    Dbmethods.deleteGrade('x1234', (err, grade) => {
      if (err) {
        throw err;
      }
      expect(result).to.not.exist;
      done();

      // Now, you can check if the grade has been added by querying the database
      // and verifying the result. This depends on how your database schema is structured.
    });
  });
  */
});
