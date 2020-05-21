// src/Utils/Hosts.ts
import { promises as fs } from 'fs';
import { createMarkdownArrayTable } from 'parse-markdown-table';

const hostMDPath = 'Tests/List1/Hosts.md';

export async function getHosts(): Promise<string[]> {
  const file = await fs.readFile(hostMDPath);

  const tableData = await createMarkdownArrayTable(file.toString());

  const hosts: string[] = [];

  let first = true;
  for await (const [name] of tableData.rows) {
    if (first === true) {
      first = false;
      continue;
    }

    hosts.push(name);
  }

  return hosts;
}
