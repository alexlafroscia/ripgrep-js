'use strict';

/**
 * @fileoverview Rule to flag wildcard targets in postMessage
 * @author Frederik Braun
 * @copyright 2015 Mozilla Corporation. All rights reserved.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Flag Wildcard Targets in `postmessage`',
      recommended: true,
    },
    fixable: null,
    schema: [
      // fill in your rschema
    ],
  },

  create(context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isLiteral(node) {
      return node && node.type === 'Literal';
    }

    function isWildcard(node) {
      return isLiteral(node) && node.value === '*';
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        // postMessage and somewindow.postMessage
        let funcName;
        if (node.callee.name) {
          funcName = node.callee.name;
        } else if (node.callee.property && node.callee.property.name) {
          funcName = node.callee.property.name;
        } else {
          // anonymous function
          return;
        }

        if (funcName === 'postMessage') {
          const [, originNode] = node.arguments;

          if (isWildcard(originNode)) {
            context.report(node, 'Using postMessage() with wildcard targets is not allowed.');
          }
        }
      },
    };
  },
};
