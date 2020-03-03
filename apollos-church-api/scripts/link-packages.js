const fs = require('fs');
const { exec } = require('child_process');

const direction = process.argv[2] || 'link'

const packageJson = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`));

const dependencies = [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.devDependencies)].filter(d => d.includes('@apollosproject'));

dependencies.forEach((dep) => {
  exec(`yarn ${direction} ${dep}`, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
       console.log(stdout);
    }
  })
})