## TypeScript Handbook: Classes

> Noticable things in https://www.typescriptlang.org/docs/handbook/classes.html

Classes

Inheritance

- Before we access a property on `this` in a constructor body, we have to call `super()`

Public, private, and protected modifiers

- In TS, each member is `public` by default
- To be compatible, one and the other must have `private` members that originated in the same declaration. The same applies to `protected` members
- `protected` modifier acts much like the `private` modifier, but also can be accessed within deriving classes
- A constructor may also be marked `protected`

Readonly modifier

- `readonly` properties must be initialized at their declaration or in the constructor
- Parameter properties let you create and initialize a member in one place by prefixing a constructor parameter with an modifier: `public`, `private`, `protected`, and `readonly`

Accessors

Static Properties

Abstract Classes

- Use `extends`
- Subclass cannot declare method that doesn't exist on declared abstract type

Advanced Techniques
