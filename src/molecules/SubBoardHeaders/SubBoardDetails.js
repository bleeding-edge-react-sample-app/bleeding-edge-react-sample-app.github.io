import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Heading from '../../atoms/Heading';

export default
class SubBoardDetails extends React.Component {
  render(){
    return (
      <Box direction="row" grow="1" style={{background: '#eaeaea'}}>
        <Box margin="auto 1em">
          <Heading level="title">
            <Text>Comments</Text>
          </Heading>
        </Box>
      </Box>
    );
  }
}
