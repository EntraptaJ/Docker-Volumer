// src/index.ts
import { connectHost, createNFSVolume } from './Library/SSH';
import { getHosts } from './Utils/Host';
import { getVolumes } from './Utils/Volumes';

if (process.env.NODE_ENV !== 'production') {
  const { default: dotenv } = await import('dotenv');

  dotenv.config();

  console.log(process.env);
}

const [hosts, volumes] = await Promise.all([getHosts(), getVolumes()]);

for (const host of hosts) {
  const ssh = await connectHost(host);

  for (const volume of volumes) {
    const result = await createNFSVolume(ssh, volume);

    console.log('Created volume', result);
  }

  console.info('Done everything');
  ssh.dispose();
}

export {};
