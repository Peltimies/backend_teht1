const Dbmethods = require('./Dbmethods');

const studentcode = 'ac9194';
const coursecode = 'HTS1008';
const newgrade = 2;

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.updateGrade(
  studentcode,
  coursecode,
  newgrade,
  function (err, result) {
    if (err) {
      return handleError(err);
    }
    console.log(
      `Grades of ${studentcode}, for the course ${coursecode} updated successfully. The new grade is ${newgrade}`
    );
    process.exit(0);
  }
);
