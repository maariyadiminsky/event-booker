import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "./Auth";

const App = () => {
  return (
    <Switch> 
      <Redirect from="/" to="/auth" exact component={null} />
      <Route path="/auth" component={Auth} />
      <Route path="/events" component={null} />
      <Route path="/bookings" component={null} />
    </Switch>
  );
}

export default App;
