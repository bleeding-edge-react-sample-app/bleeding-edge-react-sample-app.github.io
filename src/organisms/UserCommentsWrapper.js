import React, {PropTypes} from 'react';
import {Users} from '../utils/actions';
import providesStore from '../utils/decorators/providesStore';
import UserCommentsStore from '../stores/UserCommentsStore';
import Comments from '../molecules/Comments';

export default
@providesStore(UserCommentsStore)
class UserCommentsWrapper extends React.Component {
  static propTypes = {
    store: providesStore.getPropType(UserCommentsStore),
    userId: PropTypes.string.isRequired,
  };

  componentWillReceiveProps(nextProps){
    if (this.props.store.user !== nextProps.userId) {
      Users.getComments(nextProps.userId);
    }
  }

  componentDidMount(){
    if (this.props.store.user !== this.props.userId) {
      Users.getComments(this.props.userId);
    }
  }

  render(){
    var comments = this.props.store.comments;
    if (!comments.length) {
      return null;
    }

    return (
      <Comments comments={comments} />
    );
  }
}
