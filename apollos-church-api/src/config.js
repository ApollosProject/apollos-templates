import path from 'path';
import fetch from 'node-fetch';
import dotenv from "dotenv/config"; // eslint-disable-line
import ApollosConfig from '@apollosproject/config';

ApollosConfig.loadYaml({
  configPath: path.join(__dirname, '..', 'config.yml'),
});

// autodetect some settings
(async () => {
  if (!ApollosConfig.ROCK) return;

  let res;
  // plugin
  res = await fetch(
    `${ApollosConfig.ROCK.URL}/api/Apollos/GetContentChannelItemsByIds?ids=0`
  );
  const usePlugin = res.status === 200;
  if (usePlugin) console.log('Apollos Rock plugin detected!');
  ApollosConfig.loadJs({ ROCK: { USE_PLUGIN: usePlugin } });

  // version
  res = await fetch(
    `${ApollosConfig.ROCK.URL}/api/Utility/GetRockSemanticVersionNumber`
  );
  const version = res.text().split('.');
  console.log(`Apollos Version: ${version}`);
  ApollosConfig.loadJs({ ROCK: { VERSION: version[1] } });
})();
