const Dbmethods = require('./Dbmethods');
const below = 100;

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.findBel(below, function (err, result) {
  if (err) {
    return handleError(err);
  }
  console.log(`Finding all students with studypoints under ${below}:`);
  console.log(result);
  process.exit(0);
});
