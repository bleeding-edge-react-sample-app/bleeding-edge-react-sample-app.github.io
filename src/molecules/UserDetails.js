import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Heading from '../atoms/Heading';

export default
class UserDetails extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render(){
    var {user} = this.props;
    return (
      <Box>
        <Heading level="subtitle">{user.name}</Heading>
        <Box inline>
          Posts: {user.posts.length}
        </Box>
      </Box>
    );
  }
}
