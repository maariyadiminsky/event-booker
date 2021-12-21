import { render } from '../../../tests/utils';

import { ERROR_COLOR, SUCCESS_COLOR } from '../../../const';

import NotificationPing, { setNotificationPingCSS } from './'

describe('<NotificationPing />', () => {
    it('renders component with correct color', () => {
        const { container } = render(
            <NotificationPing color={ERROR_COLOR} />
        );

        const notificationPing = container.querySelector('span');

        expect(notificationPing).toBeInTheDocument();
        expect(notificationPing.className).toBe(setNotificationPingCSS(ERROR_COLOR));
        expect(notificationPing.className).not.toBe(setNotificationPingCSS(SUCCESS_COLOR));
    });
});