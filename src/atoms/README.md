# atoms

Atoms are the low level components that can be composed to create higher level
components. They allow you to create clean abstractions for the low level
DOM elements.

For example, `Box` is a highly used component. It replaces `div` as a wrapper
component. Instead of using css for layout you specify it inline and it uses
flexbox internally.

```js
<Box direction="row">
  <Box size="2em">A</Box>
  <Box size="2em">B</Box>
</Box>
```

The dev pages show example usages of these atoms and how they render.
You can alternatively look at the `propTypes` of them, which should be
enough to use them.

## Why?

Atoms encourage consistent UI patterns and allow you to control both style,
layout, and behavior of core UI elements.

For example, `Checkbox` allows you to change all `<input type="checkbox">`s
across your applications to toggle buttons. The implementation of `Checkbox`
here also includes automatic generation of unique ids for the checkbox id/label
htmlFor. This is something that requires a component, and would bloat
other views if you don't do it in one single place: the atom.
