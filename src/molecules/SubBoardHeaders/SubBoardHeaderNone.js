import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import Heading from '../../atoms/Heading';

export default
class SubBoardHeaderNone extends React.Component {
  render(){
    return (
      <Box direction="row" grow="1" style={{background: '#eaeaea'}}>
        <Box margin="auto 1em">
          <Heading level="title"></Heading>
        </Box>
      </Box>
    );
  }
}
