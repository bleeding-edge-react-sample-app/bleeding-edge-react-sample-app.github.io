import React, {PropTypes} from 'react';
import {Link as ReactRouterLink} from 'react-router';
import './Link.less';
import classnames from 'classnames';

export default class LinkAtom extends React.Component {
  static propTypes = Object.assign({}, ReactRouterLink.propTypes, {
    unstyled: PropTypes.bool,
    activeClassName: PropTypes.string,
    external: PropTypes.bool,
  });

  static defaultProps = Object.assign({}, ReactRouterLink.defaultProps, {
    unstyled: false
  });

  static contextTypes = {
    history: PropTypes.any,
  };

  render(){
    var className = classnames(
      'LinkAtom',
      this.props.unstyled ? 'LinkAtom--unstyled' : 'LinkAtom--styled'
    );

    if (this.context.history && !this.props.external) {
      return <ReactRouterLink
        {...this.props}
        className={classnames(className, 'LinkAtom--react-router')}
        activeClassName={classnames('LinkAtom--active')} />;
    }
    else {
      var target = this.props.to || '/404';
      if (target[0] !== '/' && target.indexOf('http') !== 0) target = '/' + target;

      return <a
        href={target}
        {...this.props}
        className={classnames(className, 'LinkAtom--hard-link')} />;
    }
  }
}
