import React from 'react';
import './utils/css-reset.less';
import './App.less';

export default
class App extends React.Component {
  render(){
    return (
      <div>
        <h1>App</h1>
        {this.props.children}
      </div>
    );
  }
}
