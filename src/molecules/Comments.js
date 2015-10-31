import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Heading from '../atoms/Heading';
import Link from '../atoms/Link';
import Markdown from '../atoms/Markdown';

export default
class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  };

  getGoodScoreThreshold(){
    var commentScores = this.props.comments
      .filter((x) => !x.score_hidden)
      .map((x) => x.score)
      .sort((a, b) => a - b);
    var good = commentScores[Math.floor(commentScores.length * 0.8)];
    return good > 1 ? good : Infinity;
  }

  render(){
    // find the average comment score
    var targetScore = this.getGoodScoreThreshold();

    return (
      <Box>
        {this.props.comments.map((comment) => {
          var replies = comment.replies || [];
          return (
            <Box
              key={comment.id}
              padding="0.5em"
              margin="0.5em"
              style={{
                background: comment.score >= targetScore ? '#ffff55' : '#efefef'
              }}
            >
              <Box direction="row">
                <Heading level="title">{comment.score_hidden ? '?' : comment.score}</Heading>
                <Box margin={{right: "1em"}} />
                <Box style={{maxWidth: '80em', lineHeight: '1.5'}}>
                  <Markdown content={comment.body} />
                </Box>
              </Box>
              <Box margin={{top: '0.5em'}}>
                <span>
                  by <Link to={`/user/${comment.author}`}>{comment.author}</Link>
                </span>
              </Box>
              <Comments comments={replies} />
            </Box>
          );
        })}
      </Box>
    );
  }
}
