
export default async function generateAtomTest(){
  let content;
  content += `
import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import jsxEquals from 'jsx-equals';
import ${moduleName} from '../${moduleName}';

describe('atoms/${moduleName}', () => {
  let test;
  beforeEach(() => {
    var renderer = createRenderer();
    test = (a, b) => {
      renderer.render(a);
      jsxEquals(renderer.getRenderOutput(), b);
    }
  });

  it('<${moduleName} />', () => {
    test(
      <${moduleName} />,
      <span />
    );
  });
});

`
  end(content);
}
