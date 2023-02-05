/**
 * @fileoverview Test for no-wildcard-postmessage.js rule
 * @author Frederik Braun
 * @copyright 2015 Mozilla Corporation. All rights reserved
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/no-wildcard-postmessage.js');
const { RuleTester } = require('eslint');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('no-wildcard-postmessage', rule, {
  valid: [
    'postMessage(obj);',
    "frame.postMessage(obj, 'http://domain.tld');",
    "frame.postMessage(obj, 'http://domain.tld');",
    '(function() {})()',
  ],

  // Examples of code that should trigger the rule
  invalid: [
    {
      code: "postMessage(obj, '*');",
      errors: [
        {
          message: 'Using postMessage() with wildcard targets is not allowed.',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: "win.postMessage(obj, '*');",
      errors: [
        {
          message: 'Using postMessage() with wildcard targets is not allowed.',
          type: 'CallExpression',
        },
      ],
    },
  ],
});
