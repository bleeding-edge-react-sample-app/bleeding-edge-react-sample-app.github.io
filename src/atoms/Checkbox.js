import React, {PropTypes} from 'react';
import Box from './Box';
import uniqueId from '../utils/uniqueId';

export default
class Checkbox extends React.Component {
  static propTypes = {
    on: PropTypes.bool.isRequired,
    onToggle: PropTypes.func,
  };

  constructor(){
    super();
    this.checkboxId = uniqueId();
  }

  render(){
    const {
      children, on, onToggle, disabled,
    ...props} = this.props;
    return (
      <Box inline direction="row" {...props}>
        <input
          type="checkbox"
          id={this.checkboxId}
          checked={on}
          onChange={() => onToggle && onToggle(!on)}
          disabled={disabled}
        />
        <label htmlFor={this.checkboxId}>{children}</label>
      </Box>
    );
  }
}
