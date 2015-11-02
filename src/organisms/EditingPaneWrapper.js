import React, {PropTypes} from 'react';
import {State} from '../utils/actions';
import providesStore from '../utils/decorators/providesStore';
import CurrentlyEditingStore from '../stores/CurrentlyEditingStore';
import Box from '../atoms/Box';
import TextInput from '../atoms/TextInput';
import {TransitionMotion, spring} from 'react-motion';

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
    var baseStyles = {
      position: 'fixed',
      left: '0',
      right: '0',
      height: '20em',
      background: '#eaeaea',
    };

    var getInitialStyles = () => ({
      opacity: spring(0),
      bottom: spring(-30),
    });
    var finalStyles = {
      opacity: spring(1),
      bottom: spring(0),
    };

    return (
      <TransitionMotion
        willEnter={getInitialStyles}
        willLeave={getInitialStyles}
        styles={this.props.store ? {styles: finalStyles} : {}}
      >{({styles}) => {
        if (!styles) return <div key="a" />;
        return (
          <Box size="20em" padding="1em" margin="1em" style={{
            ...baseStyles,
            ...styles,
            bottom: styles.bottom + 'em',
          }}>
            {this.renderContent()}
          </Box>
        )
      }}
      </TransitionMotion>
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
        onDismiss={() => State.clearEditing()}
      />
    );
  }
}
