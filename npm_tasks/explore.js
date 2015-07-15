// This is meant to provide a cross-platform way of doing the same thing
// as "npm explore <name> -- <cmd>" (which doesn't work on Windows; see
// https://github.com/npm/npm/issues/8932).
//
// Note that <cmd> is expected to be something extremely simple like
// "npm install" or "git pull origin master". It shouldn't contain any
// quoted arguments or other funky things.

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var ROOT_DIR = path.resolve(__dirname, '..');

function getModuleDir(moduleName) {
  return fs.realpathSync(path.resolve(ROOT_DIR, 'node_modules', moduleName));
}

function explore(moduleName, cmd) {
  execSync(cmd, { cwd: getModuleDir(moduleName), stdio: 'inherit' });
}

function main() {
  if (process.argv.length < 5 || process.argv[3] != '--') {
    console.log("usage: " + path.basename(process.argv[1]) +
                " <name> -- <cmd>");
    process.exit(1);
  }
  explore(process.argv[2], process.argv.slice(4).join(' '));
}

if (!module.parent) {
  main();
}
