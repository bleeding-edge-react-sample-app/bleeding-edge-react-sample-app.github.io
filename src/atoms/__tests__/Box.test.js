import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import {shallow, mount, render} from 'enzyme';

import Box from '../Box';
jest.unmock('../Box');

let test = (a, b) => {
  expect(render(a).text()).toBe(render(b).text());
};

describe('atoms/Box', () => {

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
