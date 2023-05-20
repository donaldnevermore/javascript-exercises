declare const FooType: unique symbol

class Foo {
    name!: string
    [FooType]!: void
}
