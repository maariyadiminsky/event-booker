import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "./Auth";
import Events from "./Events";
import Bookings from "./Bookings";

import NavBar from "../components/NavBar/NavBar";

import {
  ROOT_PATH,
  AUTH_PATH,
  EVENTS_PATH,
  BOOKINGS_PATH,
} from "../const";

const App = () => {
  return (
      <div className="bg-gray-100 min-h-screen">
          <NavBar />
          <Switch>
              <Redirect from={ROOT_PATH} to={AUTH_PATH} exact component={null} />
              <Route path={AUTH_PATH} component={Auth} />
              <Route path={EVENTS_PATH} component={Events} />
              <Route path={BOOKINGS_PATH} component={Bookings} />
          </Switch>
      </div>
  );
}

export default App;
