import React from 'react';

import Routes from '@modules/navigation/Routes';
import NavBar from '@modules/navigation/NavBar';

const App = () => (
  <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <Routes />
  </div>
);

export default App;
