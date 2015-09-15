import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import HotThreadsWrapper from '../../organisms/HotThreadsWrapper';
import {State} from '../../utils/actions';

export default
class BoardPage extends React.Component {
  componentWillMount(){
    State.changeBoard({type: 'user', name: this.props.params.id});
  }
  render(){
    return (
      <Box>
        <HotThreadsWrapper boardId={this.props.params.id} />
      </Box>
    );
  }
}
