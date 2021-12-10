import React from 'react';
import Routes from './Routes';
import NavBar from '../components/NavBar/NavBar';

const App = () => {
  return (
      <div className="bg-gray-100 min-h-screen">
          <NavBar />
          <Routes />
      </div>
  );
}

export default App;
