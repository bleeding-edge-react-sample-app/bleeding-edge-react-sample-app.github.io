import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import SubBoardHeaderWrapper from '../../organisms/SubBoardHeaderWrapper';
import MainNavigation from '../../molecules/MainNavigation';

export default
class MainLayout extends React.Component {
  static propTypes = {

  };

  render(){
    return (
      <Box>
        <Box>
          <SubBoardHeaderWrapper />
          <MainNavigation />
        </Box>
        <Box margin="1em">
          {this.props.children}
        </Box>
      </Box>
    );
  }
}
