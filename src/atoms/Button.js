import React, {PropTypes} from 'react';
import Box from './Box';
import './Button.less';

/**
  Button
 **/
export default
class Button extends React.Component {
  static propTypes = {
    which: PropTypes.oneOf(['primary', 'secondary'])
  };

  static defaultProps = {};
  render(){
    var {className, which, ...props} = this.props;
    return (
      <Box
        direction="row"
        tabIndex={-1}
        {...props}
        className={`ButtonAtom ButtonAtom--which-${which} ${className}`}
      />
    );
  }
}
