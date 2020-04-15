const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;

function getOutdated({ packages, location }){
  const { stdout } = spawnSync('npm', ['outdated', '--json', ...packages], {encoding: 'utf8', cwd: `${__dirname}/../${location}`});
  return JSON.parse(stdout);
}

function updatePackageJson({ location }){
  const clientPackage = JSON.parse(fs.readFileSync(`${__dirname}/../${location}/package.json`));

  const clientDevDeps = Object.keys(clientPackage.devDependencies).filter((pkg) => pkg.includes('@apollosproject'));
  const outdatedClientDevDeps = getOutdated({ packages: clientDevDeps, location });
  Object.keys(outdatedClientDevDeps).forEach((key) => {
    clientPackage.devDependencies[key] = outdatedClientDevDeps[key].latest;
  })

  const clientDeps = Object.keys(clientPackage.dependencies).filter((pkg) => pkg.includes('@apollosproject'));
  const outdatedClientDeps = getOutdated({ packages: clientDeps, location });
  Object.keys(outdatedClientDeps).forEach((key) => {
    clientPackage.dependencies[key] = outdatedClientDeps[key].latest;
  });

  fs.writeFileSync(
    `${__dirname}/../${location}/package.json`,
    JSON.stringify(clientPackage, null, 2)
  );
}

(async () => {
  updatePackageJson({ location: 'apollos-church-api'});
  updatePackageJson({ location: 'apolloschurchapp'});
})()