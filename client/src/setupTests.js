import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';

import '@testing-library/jest-dom';

const Providers = ({ children }) => (
  <BrowserRouter>
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  </BrowserRouter>
);

const customRender = (ui, options) => {
  if (options) {
    if (options.route) {
      window.history.pushState({}, '', options.route);
    }
  }
  
  return render(ui, { wrapper: Providers, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }