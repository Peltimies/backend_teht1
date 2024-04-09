const Dbmethods = require('./Dbmethods');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.findBel100(function (err, result) {
  if (err) {
    return handleError(err);
  }
  console.log(result);
  return result;
});
