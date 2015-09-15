import React, {PropTypes} from 'react';
import Text from './Text';

const styles = {
  title: {
    size: '1.6em',
    color: 'inherit'
  },
  subtitle: {
    size: '1.25em',
    color: '#444'
  },
  content: {
    size: '1.17em',
    color: '#666'
  },
};

/**
  Heading
 **/
export default
class Heading extends React.Component {
  static propTypes = {
    level: PropTypes.oneOf(['title', 'subtitle']),
  };

  static defaultProps = {};

  render(){
    var {
      level,
    ...props} = this.props;

    var own = styles[level];

    return (
      <Text
        {...own}
        {...props}
      />
    );
  }
}
