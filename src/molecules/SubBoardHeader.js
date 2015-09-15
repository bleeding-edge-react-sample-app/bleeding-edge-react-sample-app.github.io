import React, {PropTypes} from 'react';
import Box from '../atoms/Box';

// board types
import SubBoardHeaderNone from './SubBoardHeaders/SubBoardHeaderNone';
import SubBoardHeaderUser from './SubBoardHeaders/SubBoardHeaderUser';
import SubBoardBoard from './SubBoardHeaders/SubBoardBoard';

export default
class SubBoardHeader extends React.Component {
  static propTypes = {
    boardName: PropTypes.string,
    boardType: PropTypes.string.isRequired,
  };

  render(){
    var Component = this.getComponent();

    return (
      <Box grow="1">
        <Component name={this.props.boardName} />
      </Box>
    );
  }

  getComponent(){
    var {boardType, boardName} = this.props;
    if (boardType === 'user') {
      return SubBoardHeaderUser;
    }
    if (boardType === 'board') {
      return SubBoardBoard;
    }
    return SubBoardHeaderNone;
  }
}
