import React, {PropTypes} from 'react';
import classnames from 'classnames';
import shallowCompareWithChildrenId from '../utils/shallowCompareWithChildrenId';
import './Box.less';

/**
 Box is a primitive container with sensible flexbox defaults.
 The props control the box-model parameters in a convienent way that allows
 layout from within the view.

 This reduces boilerplate overall.
 **/

var stylePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }),
]);

const numberOrStringPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export default
class Box extends React.Component {
  static propTypes = {
    direction: PropTypes.oneOf(['row', 'column']),
    margin: stylePropType,
    padding: stylePropType,
    grow: numberOrStringPropType,
    shrink: numberOrStringPropType,
    inline: PropTypes.bool,
    size: numberOrStringPropType,

    /**
     This is used to allow a fast shouldComponentUpdate for when children
     infrequently update. Passing the same childrenId on the second render
     considers children to be equal.
     **/
    childrenId: PropTypes.any,
  };

  static defaultProps = {
    // intentionally omitted
    // direction: 'column',
    margin: null,
    padding: null,
    grow: null,
    shrink: null,
    inline: false,
  };

  shouldComponentUpdate(nextProps){
    return true;

    // disabled for now due to weird bug
    return shallowCompareWithChildrenId(this.props, nextProps);
  }

  render(){
    const {
      className, style,
      direction, inline,
      margin, padding,
      grow, shrink, size,
      ...props
    } = this.props;

    const mod = (s) => `BoxAtom--${s}`;

    let adjustedDirection = direction;
    if (!direction) {
      if (this.props.inline) adjustedDirection = 'row';
      else adjustedDirection = 'column';
    }

    // merge the class names
    const fullClassName = classnames(
      className,
      'BoxAtom',
      adjustedDirection === 'row'  ? mod('row') : mod('column'),
      inline ? mod('inline') : mod('block'),
    );

    // inline styles which are merged with the style prop
    var ownStyle = Object.assign({},
      this.directionalToString(margin, 'margin'),
      this.directionalToString(padding, 'padding'),
    );
    ownStyle.display = inline ? 'inline-flex' : 'flex';
    if (grow != null) ownStyle.flexGrow = grow;
    if (shrink != null) ownStyle.flexShrink = shrink;
    if (size != null) ownStyle.flexBasis = size;

    // We use a span here due to html restrictions involving divs.
    // Because it gets display:flex/inline-flex there aren't any style differences.
    return (
      <span
        {...props}
        className={fullClassName}
        style={style ? Object.assign(ownStyle, style) : ownStyle} />
    );
  }

  directionalToString(x, prefix){
    if (!x) return null;
    if (typeof x === 'string') return {[prefix]: x};
    var styles = {};
    if ('top' in x) styles[`${prefix}Top`] = x.top;
    if ('right' in x) styles[`${prefix}Right`] = x.right;
    if ('bottom' in x) styles[`${prefix}Bottom`] = x.bottom;
    if ('left' in x) styles[`${prefix}Left`] = x.left;
    return styles;
  }
}
