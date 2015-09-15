import React from 'react';
import {Route} from 'react-router';

import App from './App';
import AboutPage from './pages/AboutPage/AboutPage';

export default (
  <Route path="/" component={App}>
    <Route path="/about" component={function(){return <div>nope</div>}} />
  </Route>
);
