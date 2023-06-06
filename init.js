const fs = require('fs');

if (!fs.existsSync('.env')) {
	fs.copyFileSync('.env.sample', '.env');
}
if (!fs.existsSync('tmp/pgdata')) {
	fs.mkdirSync('tmp/pgdata', {recursive: true});
}
