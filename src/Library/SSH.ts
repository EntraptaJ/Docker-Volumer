// src/Library/SSH.ts
import NodeSSH from 'node-ssh';
import { Volume } from '../Utils/Volumes';

export async function connectHost(host: string): Promise<NodeSSH> {
  const ssh = new NodeSSH();

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  console.log(`Conneccting to ${host} ${username} ${password}`);

  return ssh.connect({
    host,
    username,
    password,
  });
}

export async function listVolumes(sshConn: NodeSSH): Promise<string> {
  const result = await sshConn.exec('docker', ['volume', 'ls']);

  return result;
}

export async function createNFSVolume(
  ssh: NodeSSH,
  volume: Volume,
): Promise<any> {
  console.log(`Creating NFS volume ${volume.name}`);

  console.log(volume);

  const result = await ssh.exec('docker', [
    'volume',
    'create',
    '--driver=local',
    '--opt',
    'type=nfs',
    '--opt',
    `o=addr=${volume.nfsServer},nolock,rw`,
    '--opt',
    `device=:${volume.mntPath}`,
    `${volume.name}`,
  ]);

  console.log('Volume create result: ', result);

  return result;
}
