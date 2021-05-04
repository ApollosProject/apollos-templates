import path from 'path';
import fetch from 'node-fetch';
import dotenv from "dotenv/config"; // eslint-disable-line
import ApollosConfig from '@apollosproject/config';

ApollosConfig.loadYaml({
  configPath: path.join(__dirname, '..', 'config.yml'),
});

// autodetect Apollos plugin
(async () => {
  if (!ApollosConfig.ROCK) return;
  const res = await fetch(
    `${ApollosConfig.ROCK.URL}/api/Apollos/GetContentChannelItemsByIds?ids=0`
  );
  const usePlugin = res.status === 200;
  if (usePlugin) console.log('Apollos Rock plugin detected!');
  ApollosConfig.loadJs({ ROCK: { USE_PLUGIN: usePlugin } });
})();
