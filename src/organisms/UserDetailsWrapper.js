import React, {PropTypes} from 'react';
import {Users} from '../utils/actions';
import providesStore from '../utils/decorators/providesStore';
import UserStore from '../stores/UserStore';
import UserDetails from '../molecules/UserDetails';

export default
@providesStore(UserStore)
class UserDetailsWrapper extends React.Component {
  static propTypes = {
    users: providesStore.getPropType(UserStore),
    userId: PropTypes.string.isRequired,
  };

  componentDidMount(){
    if (!this.props.users[this.props.userId]) {
      Users.get(this.props.userId);
    }
  }

  render(){
    var user = this.props.users[this.props.userId];
    if (!user) {
      return null;
    }

    return (
      <UserDetails user={user} />
    );
  }
}
