import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Post from './Post/Post';

export default
class ThreadList extends React.Component {
  static propTypes = {
    threads: PropTypes.array,
  };

  render(){
    return (
      <Box>
        {this.props.threads.map((thread) => {
          return (
            <Box key={thread.id}>
              <Post data={thread} />
            </Box>
          );
        })}
      </Box>
    );
  }
}
