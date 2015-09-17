import React, {PropTypes} from 'react';
import marked from 'marked';
import './Markdown.less';

const lexer = new marked.Lexer({sanitize: true});

export default
class Markdown extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  render(){
    var res = {__html: marked(this.props.content, {sanitize: true})};
    console.log(res);
    return (
      <div className="MarkdownAtom" dangerouslySetInnerHTML={res} />
    );
  }
}
