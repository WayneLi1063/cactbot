// Helper for automating SaintCoinach -- https://github.com/ufx/SaintCoinach

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import eslint from 'eslint';

const coinachExe = 'SaintCoinach.Cmd.exe';
const defaultCoinachPaths = ['C:\\SaintCoinach\\', 'D:\\SaintCoinach\\'];

if (
  process.env['CACTBOT_DEFAULT_COINACH_PATH'] !== undefined &&
  process.env['CACTBOT_DEFAULT_COINACH_PATH'].length > 0
)
  defaultCoinachPaths.push(process.env['CACTBOT_DEFAULT_COINACH_PATH']);

const ffxivExe = path.join('game', 'ffxiv_dx11.exe');

const defaultFfxivPaths = [
  'C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn',
  'D:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn',
];

if (
  process.env['CACTBOT_DEFAULT_FFXIV_PATH'] !== undefined &&
  process.env['CACTBOT_DEFAULT_FFXIV_PATH'].length > 0
)
  defaultFfxivPaths.push(process.env['CACTBOT_DEFAULT_FFXIV_PATH']);

const isObject = (obj: unknown): obj is { [key: string]: unknown } =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

class CoinachError extends Error {
  constructor(message?: string, cmd?: string, output?: string) {
    const errorMessage = `message: ${message ?? ''}
cmd: ${cmd ?? ''}
output: ${output ?? ''}
`;
    super(errorMessage);
  }
}

export class CoinachReader {
  coinachPath: string;
  ffxivPath: string;
  verbose: boolean;
  constructor(coinachPath: string | null, ffxivPath: string | null, verbose = false) {
    this.verbose = verbose;

    if (coinachPath === null) {
      for (const p of defaultCoinachPaths) {
        if (fs.existsSync(path.join(p, coinachExe))) {
          coinachPath = p;
          break;
        }
      }
    }

    if (ffxivPath === null) {
      for (const p of defaultFfxivPaths) {
        if (fs.existsSync(path.join(p, ffxivExe))) {
          ffxivPath = p;
          break;
        }
      }
    }

    if (coinachPath === null)
      throw new CoinachError('coinach path not found');
    if (ffxivPath === null)
      throw new CoinachError('ffxiv path not found');
    this.coinachPath = coinachPath;
    this.ffxivPath = ffxivPath;

    if (!fs.existsSync(path.join(this.coinachPath, coinachExe)))
      throw new CoinachError('invalid coinach path: ' + this.coinachPath);
    if (!fs.existsSync(path.join(this.ffxivPath, ffxivExe)))
      throw new CoinachError('invalid ffxiv path: ' + this.ffxivPath);
  }

  async exd(table: string, lang: string): Promise<string[]> {
    return await this._coinachCmd('exd', table, lang);
  }

  async rawexd(table: string, lang: string): Promise<string[]> {
    return await this._coinachCmd('rawexd', table, lang);
  }

  async _coinachCmd(coinachCmd: string, table: string, lang: string): Promise<string[]> {
    const cmdList = [path.join(this.coinachPath, coinachExe)];
    const args = [this.ffxivPath, 'lang ' + lang, coinachCmd + ' ' + table];

    const cmd = [...cmdList, ...args].map((x) => `"${x}"`).join(' ');

    if (this.verbose) {
      console.log(`coinach_path: ${this.coinachPath}`);
      console.log('ffxiv_path: ' + this.ffxivPath);
      console.log('cmd: ' + cmd);
    }
    // # This will throw an exception if stuff is VERY wrong
    // # however, return code is still 0 even if all exports fail.
    // # Also, it seems to need to be run from the SaintCoinach directory.
    const output = String(promisify(exec)(cmd));
    // # Manually check output for errors.
    let m = /^([0-9])* files exported, ([0-9])* failed/m.exec(output);
    if (!m)
      throw new CoinachError('Unknown output', cmd, output);
    if (m[1] === '0')
      throw new CoinachError('Zero successes', cmd, output);
    if (m[2] !== '0')
      throw new CoinachError('Non-zero failures', cmd, output);

    // # Find directory that this export was written to.
    // # There's no way to control this.
    m = /^Definition version: ([0-9.]*)/m.exec(output);
    if (!m)
      throw new CoinachError('Unknown output', cmd, output);

    const csvFilename = path.join(
      this.coinachPath,
      m[1] ?? '',
      coinachCmd,
      `${table}.csv`,
    );

    if (this.verbose) {
      console.log(`output: \noutput`);
      console.log(`output csv: ${csvFilename}`);
    }
    // # Read the whole file immediately,
    // # as future commands with different langs will overwrite.
    const lines = String(
      await promisify(fs.readFile)(csvFilename, {
        flag: 'r',
        encoding: 'utf-8',
      }),
    ).split(/\r?\n/);

    if (this.verbose)
      console.log(`csv lines: ${lines.length}`);

    return lines;
  }
}

export class CoinachWriter {
  cactbotPath: string;
  verbose: boolean;

  constructor(cactbotPath: string | null, verbose: boolean) {
    this.verbose = verbose;

    if (cactbotPath === null)
      cactbotPath = this._findCactbotPath();
    this.cactbotPath = cactbotPath;
    if (!fs.existsSync(this.cactbotPath))
      throw new Error(`Invalid cactboth path: ${this.cactbotPath}`);
  }

  _findCactbotPath(): string {
    return '.';
  }

  sortObjByKeys(obj: unknown): unknown {
    if (!isObject(obj) || Array.isArray(obj))
      return obj;

    const out = Object
      .keys(obj)
      .sort()
      .reduce((acc: typeof obj, key) => {
        const nested = obj[key];
        if (isObject(nested))
          acc[key] = this.sortObjByKeys(nested);
        else
          acc[key] = nested;

        return acc;
      }, {});
    return out;
  }

  async write(
    filename: string,
    scriptname: string,
    _variable: string | null,
    d: unknown[],
  ): Promise<void> {
    const fullPath = path.join(this.cactbotPath, filename);

    let str = JSON.stringify(this.sortObjByKeys(d), null, 2);

    // # make keys integers, remove leading zeroes.
    str = str.replace(/\'0*([0-9]+)\': {/, '$1: {');
    const f = `// Auto-generated from ${scriptname}
// DO NOT EDIT THIS FILE DIRECTLY


export default ${str}`;

    const linter = new eslint.ESLint({ fix: true });
    const results = await linter.lintText(f, { filePath: fullPath });

    // There's only one result from lintText, as per documentation.
    const lintResult = results[0];
    if (!lintResult || lintResult.errorCount > 0 || lintResult.warningCount > 0) {
      console.error('Lint ran with errors, aborting.');
      process.exit(2);
    }

    // Overwrite the file, if it already exists.
    const flags = 'w';
    const writer = fs.createWriteStream(fullPath, { flags: flags });
    writer.on('error', (err) => {
      console.error(err);
      process.exit(-1);
    });

    writer.write(lintResult.output);

    if (this.verbose)
      console.log(`wrote: ${filename}`);
  }

  async writeTypeScript(
    filename: string,
    scriptname: string,
    header: string | null,
    type: string | null,
    asConst: boolean | null,
    data: { [s: string]: unknown },
  ): Promise<void> {
    const fullPath = path.join(this.cactbotPath, filename);

    let str = JSON.stringify(this.sortObjByKeys(data), null, 2);

    // # make keys integers, remove leading zeroes.
    str = str.replace(/\'0*([0-9]+)\': {/, '$1: {');
    const f = `// Auto-generated from ${scriptname}
// DO NOT EDIT THIS FILE DIRECTLY
${header !== null ? '\n' + header : ''}
const data${type !== null ? ':' + type : ' '} = ${str}${asConst ? ' as const' : ''};

export default data;`;

    const linter = new eslint.ESLint({ fix: true });
    const results = await linter.lintText(f, { filePath: fullPath });

    // There's only one result from lintText, as per documentation.
    const lintResult = results[0];
    if (!lintResult || lintResult.errorCount > 0 || lintResult.warningCount > 0) {
      console.error('Lint ran with errors, aborting.');
      process.exit(2);
    }

    // Overwrite the file, if it already exists.
    const flags = 'w';
    const writer = fs.createWriteStream(fullPath, { flags: flags });
    writer.on('error', (err) => {
      console.error(err);
      process.exit(-1);
    });

    writer.write(lintResult.output);

    if (this.verbose)
      console.log(`wrote: ${filename}`);
  }
}
