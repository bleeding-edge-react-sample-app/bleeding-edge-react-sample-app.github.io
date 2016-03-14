import {inspect} from 'util';

import scwci from '../shallowCompareWithChildrenId';
jest.unmock('../shallowCompareWithChildrenId');

describe('shallowCompareWithChildrenId', () => {
  const format = (args) => '\n' + args.map((x) => inspect(x)).join('\n') + '\n';
  const test = (res, ...args) => expect(scwci(...args)).toEqual(res, format(args));
  it('does a basic shallow compare with 2 params', () => {
    test(true, {a: 1}, {a: 1});
    test(false, {a: 1}, {a: 2});
    test(false, {a: 2}, {});
    test(false, {}, {a: 1});
  });

  it('does a basic shallow compare with 4 params', () => {
    test(true, {a: 1}, {a: 1}, {b: 1}, {b: 1});
    test(false, {a: 1}, {a: 2}, {b: 1}, {b: 1});
    test(false, {a: 1}, {a: 1}, {b: 1}, {b: 2});
  });

  it('handles childrenId', () => {
    test(true, {a: 1, childrenId: 'b'}, {a: 1, childrenId: 'b'});
    test(false, {a: 1, childrenId: 'b'}, {a: 2, childrenId: 'b'});
    test(false, {a: 1, childrenId: 'b'}, {a: 2, childrenId: 'c'});
    test(false, {a: 1, childrenId: 'b'}, {a: 1, childrenId: 'c'});
    test(true, {a: 1, childrenId: 'b', children: 'x'}, {a: 1, childrenId: 'b', children: 'y'});
  });
});
