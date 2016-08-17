import React from 'react';
import { Route, IndexRoute } from 'react-router'

import App from './components/app';
import OrganismsForm from './components/OrganismsForm';
import Calendar from './components/Calendar';

export default (
  <Route path="/" component={App}> 
    <IndexRoute component={OrganismsForm} />
    <Route path="calendar" component={Calendar} />
  </Route>
);

