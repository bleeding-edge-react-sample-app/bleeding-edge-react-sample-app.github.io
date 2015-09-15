import React from 'react';
import {Route} from 'react-router';
import App from './App';
import MainLayout from './pages/MainLayout/MainLayout';

export default (
  <Route component={App}>
    <Route component={MainLayout}>
      <Route path="/user/:id" component={require('./pages/UserPage/UserPage')} />
    </Route>
  </Route>
);
