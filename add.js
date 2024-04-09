/*
 *  add.js lisää uuden opiskelijan kantaan
 */
const Dbmethods = require('./Dbmethods');

const studentcode = 'ac9194';
const name = 'Jaakko Nojonen';
const email = 'ac9194@student.jamk.fi';
const studypoints = 107;

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.add(studentcode, name, email, studypoints, function (err, result) {
  if (err) {
    return handleError(err);
  }
  console.log(`Added Student: ${name}`);
  process.exit(0);
});
