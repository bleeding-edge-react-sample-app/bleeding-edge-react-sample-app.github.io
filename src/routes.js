import React from 'react';
import {Route} from 'react-router';
import App from './App';
import MainLayout from './pages/MainLayout/MainLayout';

export default (
  <Route component={App}>
    <Route component={MainLayout}>
      <Route path="/" component={require('./pages/HomePage/HomePage')} />
      <Route path="/user/:id" component={require('./pages/UserPage/UserPage')} />
      <Route path="/r/:id" component={require('./pages/BoardPage/BoardPage')} />
      <Route path="/item/:id" component={require('./pages/DetailsPage/DetailsPage')} />
    </Route>
  </Route>
);
