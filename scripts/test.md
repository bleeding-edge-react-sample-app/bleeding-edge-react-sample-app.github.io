
The `test` tool bundles your tests with webpack and then runs mocha. It looks for `__test__` directories in `src`.

Pass `--watch` to have it run webpack in watch mode and trigger a test run when the bundle updates.

Pass specific files to have it only run certain tests, e.g.

```
./scripts/test src/atoms/__test__/Box.test.js --watch
```


