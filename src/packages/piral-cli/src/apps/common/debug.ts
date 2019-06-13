import * as Bundler from 'parcel-bundler';
import chalk from 'chalk';
import { dirname, join } from 'path';
import { buildKrasWithCli, readKrasConfig, krasrc } from 'kras';
import { getFreePort } from './port';
import { setStandardEnvs, StandardEnvProps } from './envs';
import { extendConfig } from './settings';
import { startServer } from './server';
import { liveIcon, settingsIcon } from './emoji';

export interface DebugOptions {
  publicUrl?: string;
  options: StandardEnvProps;
  source?: string;
}

export async function runDebug(port: number, entry: string, { publicUrl, options, source = entry }: DebugOptions) {
  const krasConfig = readKrasConfig({ port }, krasrc);

  if (krasConfig.directory === undefined) {
    krasConfig.directory = join(dirname(source), 'mocks');
  }

  if (krasConfig.ssl === undefined) {
    krasConfig.ssl = undefined;
  }

  if (krasConfig.map === undefined) {
    krasConfig.map = {};
  }

  if (krasConfig.api === undefined) {
    krasConfig.api = '/manage-mock-server';
  }

  const buildServerPort = await getFreePort(64834);

  await setStandardEnvs(options);

  const bundler = new Bundler(
    entry,
    extendConfig({
      publicUrl,
    }),
  );
  krasConfig.map['/'] = `http://localhost:${buildServerPort}`;
  const krasServer = buildKrasWithCli(krasConfig);
  krasServer.removeAllListeners('open');

  krasServer.on('open', svc => {
    const address = `${svc.protocol}://localhost:${chalk.green(svc.port)}`;
    console.log(`${liveIcon}  Running at ${chalk.bold(address)}.`);
    console.log(`${settingsIcon}  Manage via ${chalk.bold(address + krasConfig.api)}.`);
    startServer(buildServerPort, (bundler as any).middleware());
  });

  krasServer.start();
}
