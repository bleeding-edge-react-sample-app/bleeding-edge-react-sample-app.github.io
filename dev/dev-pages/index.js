// import main component for side effects (css)
import '../../src/App';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import util from 'util';
import Box from '../../src/atoms/Box';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import demos from './demos';

// modified by makeRouteForComponent
var links = [];

var componentRoutes = Object.keys(demos).map((key) => makeRouteForComponent(key, ...demos[key]));

function run(){
  var routes = (
    <Route name="_index" path="/" component={DemoPage}>
      {componentRoutes}
    </Route>
  );

  var root = document.getElementById('app-root');
  ReactDOM.render(<Router history={createBrowserHistory()}>{routes}</Router>, root);
}

class DemoPage extends React.Component {
  render(){
    return (
      <Box>
        <Box>
          <Box flex="1" direction="row">
            {links.map((link) => (
              <Box padding="0.5em" key={link.path}>
                <a href={link.path}>{link.text}</a>
              </Box>
            ))}
          </Box>
          <Box flex="3">
            {this.props.children}
          </Box>
        </Box>
      </Box>
    );
  }
}

function makeRouteForComponent(name, Component, ...examples){
  // for babel's es6 module output when named+default exports
  if (typeof Component === 'object') Component = Component.default;

  var DemoRouteHandler = () => (
    <Box>
      <h1 style={{fontSize: '1.3em'}}>{name}</h1>
      <Box>
        {examples.map((props, i) => (
          <Box direction="row" key={i}
            margin="1em" flex={1}
            style={{
              borderWidth: '1px',
              justifyContent: 'space-between',
              background: 'hsla(0,0%,98%,1)',
              alignItems: 'flex-start',
            }} >
            <Box margin="1em" flex={1} style={{
              background: 'white',
              boxShadow: '0 0 3px rgba(0,0,0,0.3)',
            }}>
              <Component {...props} />
            </Box>
            <Box margin="1em" flex={1}>
              <pre>{util.inspect(props, {depth: 4})}</pre>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );

  const ROUTE_PATH = `/demo/${name}`;
  links.push({text: name, path: ROUTE_PATH})

  return (
    <Route
      key={ROUTE_PATH}
      component={DemoRouteHandler}
      path={ROUTE_PATH}
    />
  );
}

run();
