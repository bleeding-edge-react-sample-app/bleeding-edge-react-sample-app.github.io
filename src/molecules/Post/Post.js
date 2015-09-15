import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import Heading from '../../atoms/Heading';
import Link from '../../atoms/Link';

export default
class Post extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      createdAt: PropTypes.number,
    })
  };

  render(){
    var item = this.props.data;
    // console.log(item);
    return (
      <Box grow="1" padding="1em" style={{width: '100%'}}>
        <Heading level="title">
          <Link external to={item.url} target="_blank">
            {item.title}
          </Link>
        </Heading>
        <Box direction="row" margin={{top: '1em'}}>
          <Box direction="row" margin={{right: '2em'}}>
            <span>
              from <Link to={'/user/' + item.author}>{item.author}</Link>
            </span>
          </Box>
          <Box direction="row" margin={{right: '1em'}}>
            <span>
              view <Link to={'/item/' + item.id}>details</Link>
            </span>
          </Box>
        </Box>
      </Box>
    );
  }
}
