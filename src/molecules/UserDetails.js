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
      <Box padding="1em" style={{background: "#eaeaea"}}>
        <Box direction="row" margin={{top: '0.65em'}}>
          <Box>
            <Heading level="title">{user.name}</Heading>
          </Box>
          <Box margin="auto 1em">
            <span>link points {user.link_karma}</span>
          </Box>
          <Box margin="auto 1em">
            <span>comment points {user.comment_karma}</span>
          </Box>
        </Box>

        <Box direction="row" margin={{top: '0.65em'}}>
          <span>
            joined {new Date(user.created_utc*1000).toString()}
          </span>
        </Box>
      </Box>
    );
  }
}
