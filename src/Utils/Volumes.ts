// src/Utils/Volumes.ts
import { promises as fs } from 'fs';
import { createMarkdownArrayTable } from 'parse-markdown-table';

const volumeMDPath = 'Tests/List1/Volumes.md';

export class Volume {
  public name: string;

  public nfsServer: string;

  public mntPath: string;

  constructor(opts: Partial<Volume>) {
    Object.assign(this, opts);
  }
}

export async function getVolumes(): Promise<Volume[]> {
  const file = await fs.readFile(volumeMDPath);

  const tableData = await createMarkdownArrayTable(file.toString());

  const volumes: Volume[] = [];

  let first = true;
  for await (const [name, nfsServer, mntPath] of tableData.rows) {
    if (first === true) {
      first = false;
      continue;
    }

    volumes.push(
      new Volume({
        name,
        nfsServer,
        mntPath,
      }),
    );
  }

  return volumes;
}
