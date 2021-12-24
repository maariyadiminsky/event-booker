import { render,fireEvent } from '../../tests/utils';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { AuthContext } from '../../context/AuthContext';
import { MOCK } from '../../const';

import Bookings from './';

describe('<Bookings />', () => {
    let portalRoot;
    let loaderFirstChildClass;
    let authWrapper;

    beforeAll(() => {
        loaderFirstChildClass = 'h-3 w-3 m-3 mr-1 rounded-full bg-green-200 animate-bounce';

        portalRoot = document.getElementById('modal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal');
            document.body.appendChild(portalRoot);
        }

        authWrapper = (children) => (
            <AuthContext.Provider value={{ token: MOCK.TOKEN, userId: '0' }}>
                {children}
            </AuthContext.Provider>
        );
    });

    it('renders component with button and existing bookings', async () => {

    });
});