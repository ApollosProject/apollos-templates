const fs = require('fs');
const { execSync } = require('child_process');
const chalk = require('chalk');

let apollosAppsLocation = null;
const apollosAppsLocationFromEnv = fs
  .readFileSync(`${__dirname}/../.env`, 'utf8')
  .match(/APOLLOS_APPS_LOCATION=(.*)/);

if (apollosAppsLocationFromEnv && apollosAppsLocationFromEnv.length >= 2) {
  apollosAppsLocation = apollosAppsLocationFromEnv[1];
}

if (!apollosAppsLocation) {
  console.error(
    chalk.red(
      'In order to link the Apollos React Native packages to your local dev environment'
    )
  );
  console.error(
    chalk.red(
      'you must configure the APOLLOS_APPS_LOCATION variable in your .env '
    )
  );
  console.error(
    chalk.red('to point at your local copy of the apollos-apps repo')
  );
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`));
const dependencies = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies),
].filter((d) => d.includes('@apollosproject'));

dependencies.forEach((dep) => {
  const folderName = dep.split('@apollosproject/')[1];

  if (
    fs.existsSync(
      `${apollosAppsLocation}/packages/apollos-${folderName}/package.json`
    )
  ) {
    const output = execSync(
      `printf 'y\n' | yarn wml add ${apollosAppsLocation}/packages/apollos-${folderName} ${__dirname}/../node_modules/${dep}`,
      { encoding: 'utf8' }
    );
    const watchmanConfig = JSON.parse(
      fs.readFileSync(
        `${apollosAppsLocation}/packages/apollos-${folderName}/.watchmanconfig`
      )
    );
    watchmanConfig.ignore_dirs = [...watchmanConfig.ignore_dirs, 'coverage'];
    fs.writeFileSync(
      `${apollosAppsLocation}/packages/apollos-${folderName}/.watchmanconfig`,
      JSON.stringify(watchmanConfig, null, 2)
    );
    console.log(output);
  }
});
