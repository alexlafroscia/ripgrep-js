/* eslint-env node, mocha */

'use strict';

const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const rg = require('..');

const expect = chai.expect;
chai.use(chaiAsPromised);

const Match = rg.Match;

function fixtureDir(name) {
  return path.join(__dirname, 'fixtures', name);
}

describe('library', function() {
  describe('search function', function() {
    it('exports a function', function() {
      expect(typeof rg).to.equal('function');
    });

    it('returns a promise', function() {
      expect(rg()).to.be.an.instanceof(Promise);
    });
  });

  describe('Match class', function() {
    it('exports a function', function() {
      expect(typeof Match).to.equal('function');
    });
  });
});

describe('input validation', function() {
  it('requires that a CWD is provided', function() {
    return expect(rg()).to.eventually.be.rejectedWith('No `cwd` provided');
  });

  it('requires that a search term is provided', function() {
    return expect(rg('foo')).to.eventually.be.rejectedWith('No search term provided');
  });
});

describe('search api', function() {
  it('returns an array of matches', function() {
    const result = rg(fixtureDir('single-file-with-foo'), 'foo');

    return result.then(function(resolution) {
      expect(resolution).to.be.an.instanceof(Array);
      resolution.forEach(function(match) {
        expect(match).to.be.an.instanceof(Match);
      });
    });
  });

  it('returns an empty array when there are no matches', function() {
    const result = rg(fixtureDir('single-file-with-foo'), 'bar');
    return expect(result).to.eventually.be.an.instanceof(Array);
  });

  it('combines results from multiple files', function() {
    const result = rg(fixtureDir('multiple-files-with-foo'), 'foo');

    return result.then(function(result) {
      expect(result.length).to.equal(2);
    });
  });
});

describe('Match class', function() {
  beforeEach(function() {
    return rg(fixtureDir('single-file-with-foo'), 'foo').then((result) => {
      this.result = result[0];
    });
  });

  it('contains the file name of the match', function() {
    expect(this.result.file).to.equal('file.txt');
  });

  it('contains the matches text', function() {
    expect(this.result.match).to.equal('foo');
  });

  it('contains the line number of the match', function() {
    expect(this.result.line).to.equal(3);
  });

  it('contains the column number of the match', function() {
    expect(this.result.column).to.equal(1);
  });
});
