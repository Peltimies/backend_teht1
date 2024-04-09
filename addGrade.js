const Dbmethods = require('./Dbmethods');

const conn = require('./dbconnection');
const studentcode = 'ac9194';
const coursecode = 'HTS1008';
const newgrade = 5;
const pointsToAdd = 5;

if (newgrade > 0) {
  // arvosanan lisäys ja pisteiden päivitys ovat transaktion sisällä
  conn.beginTransaction((err) => {
    if (err) {
      throw err;
    }
    console.log(`Adding ${studentcode}'s grade ${newgrade} to ${coursecode}`);

    // Add the grade
    Dbmethods.addGrade(studentcode, coursecode, newgrade, (err, result) => {
      if (err) {
        return conn.rollback(() => {
          throw err;
        });
      }
      console.log(`Added ${studentcode}'s grade ${newgrade} to ${coursecode}`);
      // Update the points
      Dbmethods.updatePoints(studentcode, pointsToAdd, (err) => {
        if (err) {
          return conn.rollback(() => {
            throw err;
          });
        }

        console.log(
          `Updated ${studentcode}'s studypoints with ${pointsToAdd} points`
        );

        // Commit the transaction
        conn.commit((err) => {
          if (err) {
            return conn.rollback(() => {
              throw err;
            });
          }
          console.log(
            `Added ${pointsToAdd} studypoints to ${studentcode} successfully`
          );
          process.exit(0);
        });
      });
    });
  });
}
