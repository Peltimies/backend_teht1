const Dbmethods = require('./Dbmethods');
const studentcode = 'ac9194';

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.deleteGrade(studentcode, function (err) {
  if (err) {
    return handleError(err);
  }
  console.log(`Deleted grades from: ${studentcode}`);
  process.exit(0);
});
