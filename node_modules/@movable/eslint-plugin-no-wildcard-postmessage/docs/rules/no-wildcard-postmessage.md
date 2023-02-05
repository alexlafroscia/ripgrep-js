# Flag Wildcard Targets in `postmessage` (no-wildcard-postmessage)

Using a "wildcard" (`*`) as the target origin of the `postMessage` API can allow any open browser tab to listen in on the sent message. For security reasons, you should be specific about the origin that your message is sent to.

## Rule Details

This rule aims to prevent unsafe usage of `postMessage` that could result in security vulnerabilities.

Examples of **incorrect** code for this rule:

```javascript
frame.postMessage(obj, "*");
```

Examples of **correct** code for this rule:

```javascript
frame.postMessage(obj, "http://domain.tld");
```

## Further Reading

- [Security recommendations from the W3C](https://www.w3.org/TR/webmessaging/#authors)

  > Authors should not use the wildcard keyword (*) in the targetOrigin argument in messages that contain any confidential information, as otherwise there is no way to guarantee that the message is only delivered to the recipient to which it was intended.
