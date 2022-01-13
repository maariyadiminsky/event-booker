import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from '@modules/auth/components/hoc/ProtectedRoute';
import Home from '@modules/home/Home';
import Auth from '@modules/auth/Auth';
import Events from '@modules/events/Events';
import Bookings from '@modules/bookings/Bookings';

import {
  ROOT_PATH,
  AUTH_PATH,
  EVENTS_PATH,
  BOOKINGS_PATH,
} from '@modules/common/const';

const Routes = () => (
  <div>
      <Switch>
          <Route path={ROOT_PATH} exact component={Home}/> 
          <ProtectedRoute path={AUTH_PATH} component={Auth} isAuthRoute />
          <Route path={EVENTS_PATH} component={Events} />
          <ProtectedRoute path={BOOKINGS_PATH} component={Bookings} />
      </Switch>
    </div>
);

export default Routes;
