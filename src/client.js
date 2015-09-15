import App from './App'

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';;
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';

var root = document.getElementById('app-root');
ReactDOM.render(
  <Router history={createBrowserHistory()}>{routes}</Router>
, root);
