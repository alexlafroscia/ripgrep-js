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

export type RipgrepJsonSubmatch = {
  match: { text: string };
  start: number;
  end: number;
};

export type RipGrepJsonMatch = {
  type: 'match';
  data: {
    path: {
      text: string;
    };
    lines: {
      text: string;
    };
    line_number: number;
    absolute_offset: number;
    submatches: Array<RipgrepJsonSubmatch>;
  };
};

export class Match {
  file: string;
  line: number;
  column: number;
  match: string;

  constructor(jsonResult: RipGrepJsonMatch, subMatch: RipgrepJsonSubmatch) {
    this.file = jsonResult.data.path.text;
    this.line = jsonResult.data.line_number;

    // Account for 0-index column numbers (when we want 1-index)
    this.column = subMatch.start + 1;
    this.match = subMatch.match.text;
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
