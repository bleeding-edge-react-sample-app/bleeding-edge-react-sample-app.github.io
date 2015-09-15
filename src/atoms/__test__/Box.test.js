import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import jsxEquals from 'jsx-equals';
import Box from '../Box';

describe('atoms/Box', () => {
  let test;
  beforeEach(() => {
    var renderer = createRenderer();
    test = (a, b) => {
      renderer.render(a);
      jsxEquals(renderer.getRenderOutput(), b);
    }
  });

  it('<Box />', () => {
    test(
      <Box />,
      <span className="BoxAtom BoxAtom--column BoxAtom--block" />
    );
  });

  it('<Box inline />', () => {
    test(
      <Box inline />,
      <span className="BoxAtom BoxAtom--row BoxAtom--inline" />
    );
  });

  it('<Box direction="row" />', () => {
    test(
      <Box direction="row" />,
      <span className="BoxAtom BoxAtom--row BoxAtom--block" />
    );
  });

  it('<Box ... />', () => {
    test(
      <Box size="1px" grow="2" shrink="3" margin="4px" padding={{top: "5px", left: "6px"}}/>,
      <span
        className="BoxAtom BoxAtom--column BoxAtom--block"
        style={{
          flexBasis: '1px',
          display: 'flex',
          flexGrow: "2",
          flexShrink: "3",
          margin: "4px",
          paddingTop: "5px",
          paddingLeft: "6px",
        }}
      />
    );
  });

});
