import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

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
  const { token } = useContext(AuthContext);

  console.log("token", token);

  const goToHomePageTry = () => (token ?
    <Route path={ROOT_PATH} exact component={Home}/> :
    <Redirect from={ROOT_PATH} to={AUTH_PATH} exact component={null} />
  );

  const goToAuthPageTry = () => (!token && <Route path={AUTH_PATH} component={Auth} />);
  
  return (
      <div className="bg-gray-100 min-h-screen">
        <Switch>
            {goToHomePageTry()}
            {goToAuthPageTry()}
            <Route path={EVENTS_PATH} component={Events} />
            <Route path={BOOKINGS_PATH} component={Bookings} />
        </Switch>
      </div>
  );
}

export default Routes;
