import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "./Auth";
import Events from "./Events";
import Bookings from "./Bookings";

const App = () => {
  return (
    <Switch> 
      <Redirect from="/" to="/auth" exact component={null} />
      <Route path="/auth" component={Auth} />
      <Route path="/events" component={Events} />
      <Route path="/bookings" component={Bookings} />
    </Switch>
  );
}

export default App;
