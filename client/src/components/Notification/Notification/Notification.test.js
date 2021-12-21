import { render } from '../../../tests/utils';

import { ERROR_COLOR, ERROR, SUCCESS } from '../../../const';

import Notification, { setNotificationCSS } from './'

describe('<Notification />', () => {
    it('renders component with correct color and text', () => {
        const { container } = render(
            <Notification 
                color={ERROR_COLOR}
                text={ERROR}
            />
        );

        const notificationDiv = container.querySelector('div');

        expect(notificationDiv).toBeInTheDocument();
        expect(notificationDiv.innerHTML).toBe(ERROR);
        expect(notificationDiv.innerHTML).not.toBe(SUCCESS);
        expect(notificationDiv.className).toBe(setNotificationCSS(ERROR_COLOR));
    });
});