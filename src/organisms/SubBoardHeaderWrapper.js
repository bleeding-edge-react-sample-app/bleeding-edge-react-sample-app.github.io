import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import SubBoardHeader from '../molecules/SubBoardHeader';
import providesStore from '../utils/decorators/providesStore';
import CurrentBoardStore from '../stores/CurrentBoardStore';

export default
@providesStore(CurrentBoardStore)
class SubBoardHeaderWrapper extends React.Component {
  static propTypes = {
    board: providesStore.getPropType(CurrentBoardStore),
  };

  render(){
    var board = this.props.board || {};
    return (
      <Box size="6em">
        <SubBoardHeader
          boardType={board.type || 'none'}
          boardName={board.name}
        />
      </Box>
    );
  }
}
