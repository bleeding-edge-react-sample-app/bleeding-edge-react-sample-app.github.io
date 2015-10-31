import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import DetailsWrapper from '../../organisms/DetailsWrapper';
import {State} from '../../utils/actions';

export default
class DetailsPage extends React.Component {
  componentWillMount(){
    this.updateBoard(this.props.params.id);
  }
  componentWillUpdate(nextProps){
    if (nextProps.params.id !== this.props.params.id) {
      this.updateBoard(nextProps.params.id);
    }
  }
  updateBoard(id){
    State.changeBoard({type: 'details', name: id});
  }
  render(){
    return (
      <Box>
        <DetailsWrapper id={this.props.params.id} />
      </Box>
    );
  }
}
