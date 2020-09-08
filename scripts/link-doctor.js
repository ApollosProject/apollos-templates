const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;

(async () => {
  const errors = [];
  console.log(chalk.green('Checking your linked environemnt for issues...'));
  errors.push(checkEnvVariable());
  errors.push(checkRealpath());
  errors.push(checkWml());

  const finalErrors = errors.filter(e => e);

  if (finalErrors.length === 0){
    console.log(chalk.green('No errors found! You should be good to go.\nIf you are having issues, report those issues to the Apollos Core team.\nPlease include the steps you have taken, and specific errors or broken functionality.'))
  }
  else {
    console.log(chalk.yellow('Some errors were found when checking your environment.\n\nThey are listed below in order of severity'))
    console.log(chalk.white.bgRed('Fixing the errors at the top may resolve issues further down\n'))
    finalErrors.forEach((error) => console.log(chalk.red(error)))
  }
})();

function checkRealpath(){
  const out = spawnSync('realpath', ['--help'], {encoding: 'utf8'});
  if (out.error || out.status !== 0){
    return 'Realpath is not installed. You\'ll need it. Run `brew install coreutils`'
  }
}

function getClientPackages(){
  const packageJson = JSON.parse(fs.readFileSync(`${__dirname}/../apolloschurchapp/package.json`));
  return [
    ...Object.keys(packageJson.dependencies),
    ...Object.keys(packageJson.devDependencies),
  ].filter((d) => d.includes('@apollosproject') && !d.includes('react-native-airplay-btn'));
}

function checkWml(){
  const out = spawnSync('yarn', ['wml', 'list'], {encoding: 'utf8', cwd: `${__dirname}/../apolloschurchapp`});
  const { stdout } = out;
  if (stdout.includes('No links set')){
    return 'No links in apolloschurchapp have been created. Have you ran `yarn link-packages` ?'
  }
  const linkedPackages = stdout.split('\n').filter(line => line.includes('enabled')).map((pkg) => {
    const paths = pkg.split('/');
    return `@apollosproject/${paths[paths.length - 1]}`;
  });

  const clientPackages = getClientPackages();

  const failedLinks = clientPackages.filter((package) => {
    return !linkedPackages.includes(package);
  });

  if (failedLinks.length !== 0){
    return `The following packages have failed to link. You may need to relink to fix this issue. ${failedLinks.join(', ')}`
  }

  const invalidLinks = linkedPackages.filter(package => {
    try {
      return fs.readdirSync(`${__dirname}/../apolloschurchapp/node_modules/${package}/node_modules`).includes('react-native')
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.warn(`Error reading package modules: ${e}`)
      }
    }
  });

  if (invalidLinks.length !== 0){
    return `The following packages have invalid links (they brought their node_modules along for a ride). Unlink and relink in templates to fix this issue. ${invalidLinks.join(', ')}`
  }
}

function checkEnvVariable() {
  try {
    let apollosAppsLocation = null;
    const apollosAppsLocationFromEnv = fs
      .readFileSync(`${__dirname}/../apolloschurchapp/.env`, 'utf8')
      .match(/APOLLOS_APPS_LOCATION=(.*)/);

    if (apollosAppsLocationFromEnv && apollosAppsLocationFromEnv.length >= 2) {
      apollosAppsLocation = apollosAppsLocationFromEnv[1];
    } else {
      return 'You have a .env file, but it doesn\'t include a reference to APOLLOS_APPS_LOCATION. \n\nAdd a variable called APOLLOS_APPS_LOCATION and point it at the location on your filesystem of your apollos-apps repo.'
    }
    console.log(path.resolve(__dirname, '../apolloschurchapp/', apollosAppsLocation))
    if (!fs.existsSync(
      `${path.resolve(__dirname, '../apolloschurchapp/', apollosAppsLocation)}/package.json`
    )){
      return 'You have a APOLLOS_APPS_LOCATION set in your .env, but it doesn\'t point at the apollos-apps repo. Check the variable and confirm it\'s correct'
    }
   } catch (e) {
     return 'Error reading environment variables. You probally need to create a .env file.'
   }

   return null;
}
