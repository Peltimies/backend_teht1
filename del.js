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

Dbmethods.del(studentcode, function (err) {
  if (err) {
    return handleError(err);
  }

  console.log(
    `Deleted data from: ${studentcode}, ${name}, ${email}. With a studypoint count of: ${studypoints}`
  );
  process.exit(0);
});
