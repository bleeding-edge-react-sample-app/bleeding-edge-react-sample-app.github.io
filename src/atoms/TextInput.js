import React, {PropTypes} from 'react';
import Box from './Box';
import Text from './Text';
import './TextInput.less';

/**
  TextInput
 **/
export default
class TextInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    tag: PropTypes.oneOf(['input', 'textarea']),
    direction: PropTypes.oneOf(['row', 'column']),
  };

  static defaultProps = {
    onChange: () => {},
    direction: 'row',
    type: 'text',
    tag: 'input',
  };

  render(){
    var {
      value, onChange, type, className,
      style, direction, tag,
      ...props
    } = this.props;
    return (
      <Box {...{style, direction}}>
        {this.props.label && <Text className="TextInputAtom__Label">{this.props.label}</Text>}
        <this.props.tag
          type={type}
          value={value}
          className={`TextInputAtom__Input ${className}`}
          onChange={(e) => onChange(e.target.value)}
          style={style}
          {...props}
        />
      </Box>
    );
  }
}
