const Dbmethods = require('./Dbmethods');

const studentcode = 'ac9194';
const coursecode = 'HTS1005';
const newgrade = 5;

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.updategrade(
  studentcode,
  coursecode,
  newgrade,
  function (err, result) {
    if (err) {
      return handleError(err);
    }
    console.log(result);
    return result;
  }
);
