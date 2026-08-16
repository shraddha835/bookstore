const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'gen', 'db', 'package.json');

if (!fs.existsSync(target)) {
  console.log('No generated db package found; nothing to patch.');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(target, 'utf8'));

if (pkg?.scripts?.start) {
  const original = pkg.scripts.start;
  const patched = original.replace(
    /\s+--parameter\s+com\.sap\.hana\.di\.table\/try_fast_table_migration=true/g,
    ''
  );

  if (patched !== original) {
    pkg.scripts.start = patched;
    fs.writeFileSync(target, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log('Patched gen/db/package.json: removed incompatible try_fast_table_migration flag.');
  } else {
    console.log('No incompatible try_fast_table_migration flag found in gen/db/package.json.');
  }
} else {
  console.log('gen/db/package.json does not define a start script.');
}
