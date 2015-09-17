import React, {PropTypes} from 'react';
import {State} from '../utils/actions';
import providesStore from '../utils/decorators/providesStore';
import CurrentlyEditingStore from '../stores/CurrentlyEditingStore';
import Box from '../atoms/Box';
import TextInput from '../atoms/TextInput';

export default
@providesStore(CurrentlyEditingStore)
class EditingPaneWrapper extends React.Component {
  static propTypes = {
    store: providesStore.getPropType(CurrentlyEditingStore),
  };

  render(){
    var style = {
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      height: '20em',
      background: '#eaeaea',
    };
    if (this.props.store == null) {
      style.bottom = '-25em';
    }
    return (
      <Box size="20em" padding="1em" margin="1em" style={style}>
        {this.renderContent()}
      </Box>
    );
  }
  renderContent(){
    if (!this.props.store) return null;

    return (
      <Box grow="1">
        <TextInput
          label="Your comment"
          tag="textarea"
          value="testing"
          direction="column"
          onChange={() => {}}
          style={{flexGrow: '1'}}
        />
      </Box>
    );
  }
}
