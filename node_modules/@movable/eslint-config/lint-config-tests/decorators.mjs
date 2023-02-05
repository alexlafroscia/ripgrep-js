function classDecorator() {}

function methodDecorator() {}

@classDecorator
export class Foo {
  @methodDecorator
  method() {}
}
