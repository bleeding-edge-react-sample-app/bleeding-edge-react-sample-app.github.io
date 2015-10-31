import React, {PropTypes} from 'react';
import {Details, State} from '../utils/actions';
import providesStore from '../utils/decorators/providesStore';
import DetailsStore from '../stores/DetailsStore';
import DetailsComponent from '../molecules/Details';

export default
@providesStore(DetailsStore)
class DetailsWrapper extends React.Component {
  static propTypes = {
    store: providesStore.getPropType(DetailsStore),
    id: PropTypes.string.isRequired,
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.id !== this.props.id) {
      this.needsUpdate = true;
    }
  }

  componentDidMount(){
    this.doUpdate(this.props.id);
  }

  componentDidUpdate(){
    if (this.needsUpdate) {
      this.needsUpdate = false;
      this.doUpdate(this.props.id);
    }
  }

  doUpdate(id){
    if (this.props.store.id !== id) {
      Details.get({id});
    }
  }

  render(){
    var {loading, id, comments} = this.props.store;
    if (loading || id !== this.props.id) {
      return null;
    }
    return (
      <DetailsComponent comments={comments} />
    );
  }
}
