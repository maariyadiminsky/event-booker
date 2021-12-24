import React from 'react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import { render } from '../../../../tests/utils';
import { AuthContext } from '../../../../context/AuthContext';

import { 
    MOCK, 
    AUTH_PATH,
    BOOKINGS_PATH 
} from '../../../../const';

import ProtectedRoute from './';

// renders auth page only if token doesn't exist
// renders protected page only token exists
// redirects protect page to home page if token doesn't exist
describe('<ProtectedRoute />', () => {
    let component;
    let wrapper;

    beforeAll(() => {
        component = () => (<div>{MOCK.WORKS_TEXT}</div>);
    });

    beforeEach(() => {
        wrapper = (path, component, isAuthRoute, hasToken) => {
            const history = createMemoryHistory()
            const token = hasToken && MOCK.TOKEN;
            history.push(path);

            return (
                <Router history={history}>
                    <AuthContext.Provider value={{ token }}>
                        <ProtectedRoute path={path} component={component} isAuthRoute={isAuthRoute} />
                    </AuthContext.Provider>
                </Router>
            );
        }
    });

    it('renders protected auth page(login/create account) only if token doesn\'t exist', () => {
        const { queryByText } = render(wrapper(AUTH_PATH, component, true, true));

        const componentText = queryByText(MOCK.WORKS_TEXT);

        expect(componentText).not.toBeInTheDocument();
    });

    it('renders protected page only token exists', () => {
        const { getByText } = render(wrapper(BOOKINGS_PATH, component, false, true));

        const componentText = getByText(MOCK.WORKS_TEXT);

        expect(componentText).toBeInTheDocument();
    }); 
});