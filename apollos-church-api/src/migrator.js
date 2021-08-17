import dotenv from 'dotenv/config'; // eslint-disable-line
import '@apollosproject/data-connector-postgres/lib/postgres/pgEnum-fix';
import config from './config'; // eslint-disable-line

import ApollosConfig from '@apollosproject/config';
import { createMigrationRunner } from '@apollosproject/data-connector-postgres';

let dataObj;

if (ApollosConfig?.DATABASE?.URL) {
  dataObj = require('./data/index.postgres');
} else {
  dataObj = require('./data/index');
}

const { migrations } = dataObj;

// make sure this is called last.
// (or at least after the apollos server setup)
(async () => {
  if (ApollosConfig?.DATABASE?.URL) {
    try {
      const migrationRunner = await createMigrationRunner({ migrations });
      migrationRunner.runAsCLI();
    } catch (e) {
      console.log(e);
    }
  } else {
    console.warn('Please specify a database URL to perform migrations');
  }
})();
