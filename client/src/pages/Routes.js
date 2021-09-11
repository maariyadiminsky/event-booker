import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "../components/Auth/hoc/ProtectedRoute";
import Home from "./Home";
import Auth from "./Auth";
import Events from "./Events";
import Bookings from "./Bookings";

import {
  ROOT_PATH,
  AUTH_PATH,
  EVENTS_PATH,
  BOOKINGS_PATH,
} from "../const";

const Routes = () => {

  return (
    <div className="bg-gray-100 min-h-screen">
        <Switch>
            <Route path={ROOT_PATH} exact component={Home}/> 
            <ProtectedRoute path={AUTH_PATH} component={Auth} isAuthRoute />
            <Route path={EVENTS_PATH} exact component={Events}/> {/* temporary while I create this page */}
            {/* <ProtectedRoute path={EVENTS_PATH} component={Events} /> */}
            <ProtectedRoute path={BOOKINGS_PATH} component={Bookings} />
        </Switch>
      </div>
  );
}

export default Routes;
