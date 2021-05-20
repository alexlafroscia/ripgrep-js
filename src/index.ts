import { exec } from 'child_process';
import debug from 'debug';
import { RipGrepError, RipGrepJsonMatch, Match, Options } from './types';

export * from './types';

const execLog = debug('ripgrep-js:exec');

function formatResults(stdout: string) {
  stdout = stdout.trim();

  if (!stdout) {
    return [];
  }

  return stdout
    .split('\n')
    .map((line) => JSON.parse(line))
    .filter((jsonLine) => jsonLine.type === 'match')
    .reduce((acc, resultJson: RipGrepJsonMatch) => {
      return [
        // Previous matches
        ...acc,
        // One new result per sub-match
        ...resultJson.data.submatches.map((submatch) => new Match(resultJson, submatch)),
      ];
    }, [] as Match[]);
}

export function ripGrep(cwd: string, searchTerm: string): Promise<Array<Match>>;
export function ripGrep(cwd: string, options: Options): Promise<Array<Match>>;

export function ripGrep(cwd: string, optionsOrSearchTerm: Options | string): Promise<Array<Match>> {
  let options: Options;

  if (typeof optionsOrSearchTerm === 'string') {
    options = {
      string: optionsOrSearchTerm,
    };
  } else {
    options = optionsOrSearchTerm;
  }

  if (!cwd) {
    return Promise.reject(new Error('No `cwd` provided'));
  }

  if (arguments.length === 1) {
    return Promise.reject(new Error('No search term provided'));
  }

  let execString = 'rg --json';
  if ('regex' in options) {
    execString = `${execString} -e ${options.regex}`;
  } else if ('string' in options) {
    execString = `${execString} -F ${options.string}`;
  }

  if (options.fileType) {
    if (!Array.isArray(options.fileType)) {
      options.fileType = [options.fileType];
    }

    for (const fileType of options.fileType) {
      execString = `${execString} -t ${fileType}`;
    }
  }

  if (options.globs) {
    execString = options.globs.reduce((command, glob) => {
      return `${command} -g '${glob}'`;
    }, execString);
  }

  execLog(execString);

  return new Promise(function (resolve, reject) {
    exec(execString, { cwd }, (error, stdout, stderr) => {
      if (!error || (error && stderr === '')) {
        resolve(formatResults(stdout));
      } else {
        reject(new RipGrepError(error, stderr));
      }
    });
  });
}
