import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import UserDetailsWrapper from '../../organisms/UserDetailsWrapper';
import {State} from '../../utils/actions';

export default
class UserPage extends React.Component {
  componentWillMount(){
    State.changeBoard({type: 'user', name: this.props.params.id});
  }
  render(){
    return (
      <Box>
        <UserDetailsWrapper userId={this.props.params.id} />
        
      </Box>
    );
  }
}
