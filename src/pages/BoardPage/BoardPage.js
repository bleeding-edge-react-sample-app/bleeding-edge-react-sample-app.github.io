import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import HotThreadsWrapper from '../../organisms/HotThreadsWrapper';
import {State} from '../../utils/actions';

export default
class BoardPage extends React.Component {
  componentWillMount(){
    this.updateBoard(this.props.params.id);
  }
  componentWillUpdate(nextProps){
    if (nextProps.params.id !== this.props.params.id) {
      this.updateBoard(nextProps.params.id);
    }
  }
  updateBoard(id){
    State.changeBoard({type: 'board', name: id});
  }
  render(){
    return (
      <Box>
        <HotThreadsWrapper boardId={this.props.params.id} />
      </Box>
    );
  }
}
