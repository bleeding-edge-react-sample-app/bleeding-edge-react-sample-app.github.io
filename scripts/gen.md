gen is a command line tool for generating source files.

It prompts for additional information interactively. Some of the information, such as which template to use, is extracted from the file path you pass. For example in this example it uses the atom component template and makes a class named `Foo`.

```
$ gen src/atoms/Foo.js
```

When modifying the file create a new function, follow this example:

```js
async function generateHelloWorld(){
    var name = await prompt('Say hello to whom?');
    var content = `console.log('Hello, ${name}!');`;
    end(content);
}
```

And add it to the file pattern matching section

```js
else if (/src\/greetings\//.test(filePath)) generateHelloWorld();
```
.
