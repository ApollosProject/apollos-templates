const fs = require('fs');
const { execSync, exec } = require('child_process');

const semver = require(`semver`);

const tag = process.argv[2];
const force = process.argv[3];

if (!tag) {
  console.warn('Usage: ./add-packages.sh <TAG>');
}

const packageJson = JSON.parse(fs.readFileSync(`${process.env.PWD}/package.json`));

const dependencies = [...Object.keys(packageJson.dependencies)]
  .filter(
    (d) =>
      d.includes('@apollosproject') && !d.includes('react-native-airplay-btn')
  )
  .map((key) => ({
    pkg: key,
    version: semver.coerce(packageJson.dependencies[key]),
  }));

const devDepenencies = [...Object.keys(packageJson.devDependencies)]
  .filter(
    (d) =>
      d.includes('@apollosproject') && !d.includes('react-native-airplay-btn')
  )
  .map((key) => ({
    pkg: key,
    version: semver.coerce(packageJson.devDependencies[key]),
  }));

const filterDependencies = (deps) =>
  Promise.all(
    deps.map(
      (dep) =>
        new Promise((resolve) => {
          exec(
            `npm dist-tag ${dep.pkg}@${tag}`,
            { encoding: 'utf8' },
            (err, tags) => {
              const currentTagMatch = tags.match(new RegExp(`${tag}: (.*)`));
              const currentTagVersion = semver.coerce(currentTagMatch[1]);
              const shouldUpdate = semver.gt(currentTagVersion, dep.version);
              resolve({ shouldUpdate, pkg: dep.pkg });
            }
          );
        })
    )
  );

(async () => {
  console.log('Evaluating packages to update...');
  let depsToUpdate = [];
  let devDepsToUpdate = [];
  // Filter out packages who would be downgraded by updating to the latest tag.
  if (!force) {
    const deps = await filterDependencies(dependencies);
    const devDeps = await filterDependencies(devDepenencies);

    depsToUpdate = deps.filter(({ shouldUpdate }) => shouldUpdate);
    devDepsToUpdate = devDeps.filter(({ shouldUpdate }) => shouldUpdate);
  }
  console.log(`Updating the following packages`);
  const updateString = depsToUpdate.map(({ pkg }) => `${pkg}@${tag}`).join(' ');
  console.log(updateString);

  console.log('Updating the following dev deps');
  const devUpdateString = devDepsToUpdate
    .map(({ pkg }) => `${pkg}@${tag}`)
    .join(' ');
  console.log(devUpdateString);

  if (depsToUpdate.length) {
    const output = execSync(`yarn add ${updateString} --ignore-scripts`, {
      encoding: 'utf8',
    });
    console.log(output);
  }

  if (devDepsToUpdate.length) {
    const devOutput = execSync(
      `yarn add --dev ${devUpdateString} --ignore-scripts`,
      { encoding: 'utf8' }
    );
    console.log(devOutput);
  }
})();
