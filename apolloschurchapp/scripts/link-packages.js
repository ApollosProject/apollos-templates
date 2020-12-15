const fs = require('fs');
const { execSync } = require('child_process');

const direction = process.argv[2] || 'link';

const packageJson = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`));

const dependencies = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies),
].filter(
  (d) =>
    d.includes('@apollosproject') &&
    !d.includes('react-native-airplay-btn') &&
    !d.includes('storybook')
);

dependencies.forEach((dep) => {
  const output = execSync(`yarn ${direction} ${dep}`, { encoding: 'utf8' });
  console.log(output);
});
