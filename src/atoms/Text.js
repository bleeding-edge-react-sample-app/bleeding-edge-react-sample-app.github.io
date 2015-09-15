import React, {PropTypes} from 'react';
import Box from './Box';

export default
class Text extends React.Component {
  static propTypes = Object.assign({}, Box.propTypes, {
    children: PropTypes.any,
    size: PropTypes.string,
    color: PropTypes.string,
    weight: PropTypes.string,
  })

  static defaultProps = {
    size: 'inherit',
    color: 'inherit',
    weight: 'inherit',
  };

  render(){
    var {
      size, style, color, weight,
    ...props} = this.props;
    return (
      <Box
        inline
        {...props}
        style={Object.assign({weight, color, fontSize: size}, style)}
        childrenKey={this.props.children}
      />
    );
  }
}
