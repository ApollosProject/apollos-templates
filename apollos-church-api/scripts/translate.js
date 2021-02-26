const {
  createGlobalId,
  parseGlobalId,
} = require('@apollosproject/server-core');

const [id] = process.argv.slice(2);
if (!id) {
  console.log(
    'Pass Rock or Apollos ID: translate.js AuthenticatedUser:8sad98fd89sadf98uasdf'
  );
  process.exit(1);
}

if (id.includes(':')) console.log(parseGlobalId(id).id);
else console.log(createGlobalId(id, 'Generic').split(':')[1]);
