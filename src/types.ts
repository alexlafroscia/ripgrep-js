import { ExecException } from 'child_process';

type StringSearchOptions = {
  string: string;
};

type RegexSearchOptions = {
  regex: string;
};

type LocatorOptions = StringSearchOptions | RegexSearchOptions;

export type Options = LocatorOptions & {
  globs?: Array<string>;
  fileType?: string | Array<string>;
};

export class Match {
  file: string;
  line: number;
  column: number;
  match: string;

  constructor(matchText: string) {
    const splitText = matchText.split(':');

    this.file = splitText.shift()!;
    this.line = parseInt(splitText.shift()!);
    this.column = parseInt(splitText.shift()!);
    this.match = splitText.join(':');
  }
}

export class RipGrepError {
  private error: ExecException;

  stderr: string;

  constructor(error: ExecException, stderr: string) {
    this.error = error;
    this.stderr = stderr;
  }

  get message(): string {
    return this.error.message;
  }
}
