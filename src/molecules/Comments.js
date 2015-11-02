import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Heading from '../atoms/Heading';
import Link from '../atoms/Link';
import Markdown from '../atoms/Markdown';
import {State} from '../utils/actions';

export default
class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    goodScoreThreshold: PropTypes.number,
  };

  getGoodScoreThreshold(){
    if (this.props.goodScoreThreshold) {
      return this.props.goodScoreThreshold;
    }

    // recursively get the comment scores
    const getScores = (comments) => {
      if (!comments) return [];

      var scores = comments
        .filter((x) => !x.score_hidden)
        .map((x) => [
          x.score,
          getScores(x.replies),
        ])
        .reduce((as, bs) => as.concat(bs), [])
      return scores;
    }
    var commentScores = getScores(this.props.comments)
      .sort((a, b) => a - b);

    // find a good threshold
    var goal = 0.6, good = 0;

    while (goal < 1 && good <= 3) {
      good = commentScores[Math.floor(commentScores.length * goal)];
      console.log(good);
      goal += 0.05;
    }
    return good > 3 ? good : Infinity;
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
                background: comment.score >= targetScore ? '#ffffaa' : '#efefef'
              }}
            >
              <Box direction="row">
                <Heading level="title">{comment.score_hidden ? '?' : comment.score}</Heading>
                <Box margin={{right: "1em"}} />
                <Box style={{maxWidth: '80em', lineHeight: '1.5'}}>
                  <Markdown content={comment.body} />
                </Box>
              </Box>
              <Box margin={{top: '0.5em'}} direction="row">
                <span>
                  by <Link to={`/user/${comment.author}`}>{comment.author}</Link>
                </span>
                <Box
                  margin="0 1em"
                  onClick={() => {
                    State.setEditing({
                      type: 'comment',
                      id: comment.id,
                    })
                  }}
                  style={{cursor: 'pointer'}}
                >
                  Reply
                </Box>
              </Box>
              <Comments comments={replies} goodScoreThreshold={targetScore} />
            </Box>
          );
        })}
      </Box>
    );
  }
}
