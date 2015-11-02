import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import TextInput from '../../atoms/TextInput';

export default
class CommentEditor extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  render(){
    return (
      <Box grow="1">
        <TextInput
          label="Your comment"
          tag="textarea"
          direction="column"
          value={this.props.value && this.props.value.text || ''}
          onChange={(e) => {
            this.props.onChange({text: e.target.value, type: 'comment'})
          }}
          style={{flexGrow: '1'}} />
        <Box
          style={{position: 'absolute', top: '0', right: '0.5em'}}
          onClick={() => this.props.onDismiss()}
        >
          x
        </Box>
      </Box>
    );
  }
}
