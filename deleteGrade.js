const Dbmethods = require('./Dbmethods');

const studentcode = 'ac9194';

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.deleteGrade(studentcode, function (err, result) {
  if (err) {
    return handleError(err);
  }
  console.log(result);
  return result;
});
