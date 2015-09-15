import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import {promisify} from 'bluebird';

// wrapper around inquirer.prompt
export const prompt = (question) => new Promise((resolve) => inquirer.prompt([
  Object.assign(
    {type: 'input', name: 'x'},
    typeof question === "string" ? {message: question} : question
  )
], resolve)).then(({x}) => x);

export const fileExists = (file) => new Promise((resolve) => fs.exists(file, resolve));

// resolve some static variables
export const filePath = argv._[0];
export const moduleName = getModuleName(filePath);

export function getModuleName(filePath){
  let name = filePath.split('/').pop().split('.').shift()
  // npm-package-name to npmPackageName
  name = name.split('-').map((x, i) => i === 0 ? x : x[0].toUpperCase() + x.slice(1)).join('');
  return name;
};

export async function getModules(relativeTo){
  let answer
  var absoluteSource = path.resolve(process.cwd(), relativeTo);

  var results = [];
  while (answer = await prompt('Name of module to include (e.g. "atoms/Box.js")')) {
    let name = getModuleName(answer);
    let location;
    if (answer.indexOf('/') !== -1) {
      var absoluteModule = path.resolve(process.cwd(), path.join('src', answer));
      location = path.relative(absoluteSource, absoluteModule);

      // why do I need to do this?
      if (location[1] === '.') {
        location = location.slice(1);
      }

      if (!await fileExists(absoluteModule) && !await fileExists(absoluteModule + '.js')) {
        console.warn(`WARN: Path "${location}" from "${absoluteSource}" does not exist.`);
      }
    }
    else {
      location = name;
    }
    results.push(`import ${name} from '${location}';`);
  }
  return results.join('\n');
}

export function run(mod){
  require('./' + mod)({moduleName, filePath})
  .catch((err) => {
    console.error(err);
  })
}

export function end(content){
  console.error(`Writing to ${filePath}`);
  console.error(content.split('\n').map((x) => `    ${x}`).join('\n'));

  promisify(fs.writeFile)(filePath, content, 'utf8')
  .then(() => {
    console.error(`Written to ${filePath}`);
  }, (err) => {
    console.error(`Failed to write ${filePath}`);
    console.error(err);
  });
}
