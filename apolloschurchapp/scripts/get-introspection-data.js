const fs = require('fs');
const Path = require('path');
require('dotenv/config');
const fetch = require('node-fetch');

const attempts = 0;
const maxAttempts = 3;
const timeBetweenAttempts = 5 * 1000;

const getIntrospectionData = async () => {
  try {
    const query = await fetch(process.env.APP_DATA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
      }),
    });

    const { data } = await query.json();

    /* eslint no-underscore-dangle: 0 */
    data.__schema.types = await data.__schema.types.filter(
      (type) => type.possibleTypes !== null
    );

    await fs.writeFileSync(
      Path.resolve(__dirname, '../src/client/fragmentTypes.json'),
      JSON.stringify(data)
    );

    console.log('Successfully wrote fragmentTypes!');
  } catch (e) {
    if (attempts < maxAttempts) {
      console.log(
        `Error writing fragmentTypes (-api probably hasn't started yet). Trying again after wait. Attempt: ${attempts +
          1} of ${maxAttempts}`
      );
      await new Promise((resolve) => setTimeout(resolve, timeBetweenAttempts)); // try again after waiting
      getIntrospectionData();
    } else {
      // throw new Error('Error writing fragmentTypes file', e);
    }
  }
};

getIntrospectionData();
