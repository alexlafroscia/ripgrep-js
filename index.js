/* eslint-env node */

'use strict';

const exec = require('child_process').exec;

function RipgrepError(error, stderr) {
  this.message = error;
  this.stderr = stderr;
}

function formatResults(stdout) {
  stdout = stdout.trim();

  if (!stdout) {
    return [];
  }

  return stdout
    .split('\n')
    .map((line) => new Match(line));
}

module.exports = function ripGrep(cwd, searchTerm) {
  if (!cwd) {
    return Promise.reject('No `cwd` provided');
  }

  if (!searchTerm) {
    return Promise.reject('No search term provided');
  }

  return new Promise(function(resolve, reject) {
    exec(`rg --column --line-number --color never -e ${searchTerm}`, { cwd }, (error, stdout, stderr) => {
      if (!error || (error && stderr === '')) {
        resolve(formatResults(stdout));
      } else {
        reject(new RipgrepError(error, stderr));
      }
    });
  });
};

class Match {
  constructor(matchText) {
    matchText = matchText.split(':');

    this.file = matchText.shift();
    this.line = parseInt(matchText.shift());
    this.column = parseInt(matchText.shift());
    this.match = matchText.join(':');
  }
}

module.exports.Match = Match;
