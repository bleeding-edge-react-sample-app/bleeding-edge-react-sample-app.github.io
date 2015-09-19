import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import Heading from '../../atoms/Heading';
import Text from '../../atoms/Text';
import Markdown from '../../atoms/Markdown';
import stripIndent from 'strip-indent';
import {State} from '../../utils/actions';

export default
class HomePage extends React.Component {
  componentDidMount(){
    State.changeBoard({type: 'home', name: 'React Edge Sample App'});
  }

  render(){
    return (
      <Box margin="2em auto" padding="2em" style={{background: '#eaeaea'}}>
        <Heading level="title">
          <Text>Bleeding Edge Sample App</Text>
        </Heading>
        <Box>
          <Markdown content={stripIndent(`
            This is a sample application for the React Edge 2nd Edition.

            It's a reddit clone built with React, React-Router, Reflux and other
            libraries.
          `)} />
        </Box>
      </Box>
    );
  }
}
