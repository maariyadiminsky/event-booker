import React from "react";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <Route path="/" component={() => <div>test</div>} />
    <Route path="/auth" component={() => <div>test</div>} />
    <Route path="/events" component={() => <div>test</div>} />
    <Route path="/bookings" component={() => <div>test</div>} />
  );
}

export default App;
