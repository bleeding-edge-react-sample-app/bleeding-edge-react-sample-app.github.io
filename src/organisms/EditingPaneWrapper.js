import React, {PropTypes} from 'react';
import {State} from '../utils/actions';
import providesStore from '../utils/decorators/providesStore';
import CurrentlyEditingStore from '../stores/CurrentlyEditingStore';
import Box from '../atoms/Box';
import TextInput from '../atoms/TextInput';

import CommentEditor from '../molecules/Editors/CommentEditor';

export default
@providesStore(CurrentlyEditingStore)
class EditingPaneWrapper extends React.Component {
  static propTypes = {
    store: providesStore.getPropType(CurrentlyEditingStore),
  };

  constructor(){
    super();
    this.state = {value: null};
  }

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

    var Component = {
      comment: CommentEditor,
    }[this.props.store.type];

    return (
      <Component
        value={this.state.value}
        onChange={(value) => this.setState({value})}
      />
    );
  }
}
