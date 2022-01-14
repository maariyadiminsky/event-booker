import { render } from '@modules/app/setupTests';
import userEvent from '@testing-library/user-event';

import { getDateInCorrectFormat } from '@modules/common/utils/date';
import { setNotificationCSS } from '@modules/common/notification/Notification';
import { eventsMockData } from '@modules/events/mocks';

import { 
    REMOVE_BUTTON_TEXT,
    WARNING_COLOR,
    ERROR_COLOR,
    TODAY,
    EXPIRED
} from '@modules/common/const';

import Event from '@modules/events/components/Event';

describe('<Event />', () => {
    let toggleCancelModal;
    let setCancelEventId;
    let event;

    beforeAll(() => {
        toggleCancelModal = jest.fn();
        setCancelEventId = jest.fn();
        event = eventsMockData[0];
    });

    it('renders component', () => {
        const { getByText } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='1'
                event={event}
            />
        );

        const title = getByText(event.title);
        const description = getByText(event.description);
        const price = getByText(`$${event.price}`);
        const date = getByText(getDateInCorrectFormat(event.date));

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(date).toBeInTheDocument();
    });

    it('renders remove option if user is creator of event', () => {
        const { getByRole } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='1'
                event={event}
            />
        );

        const removeButton = getByRole('button', { name: REMOVE_BUTTON_TEXT });

        expect(removeButton).toBeInTheDocument();
    });

    it('doesn\'t render remove option if user is not creator of event', () => {
        const { queryByText } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='2'
                event={event}
            />
        );

        const removeButton = queryByText(REMOVE_BUTTON_TEXT);

        expect(removeButton).not.toBeInTheDocument();
    });

    it('renders expired notification if event is event is before today', () => {
        const { getByText } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='2'
                event={event}
            />
        );

        const expiredNotification = getByText(EXPIRED);

        expect(expiredNotification).toBeInTheDocument();
        expect(expiredNotification.className).toBe(setNotificationCSS(ERROR_COLOR));
    });

    it('renders today notification if event is happening today', () => {
        const eventToday = {
            ...event,
            date: `${new Date().toISOString()}`,
        };
        const { getByText } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='2'
                event={eventToday}
            />
        );

        const todayNotification = getByText(TODAY);

        expect(todayNotification).toBeInTheDocument();
        expect(todayNotification.className).toBe(setNotificationCSS(WARNING_COLOR));
    });

    it('handles callback when user clicks remove', () => {
        const { getByRole } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='1'
                event={event}
            />
        );

        const removeButton = getByRole('button', { name: REMOVE_BUTTON_TEXT });

        expect(removeButton).toBeInTheDocument();

        userEvent.click(removeButton);

        expect(toggleCancelModal).toHaveBeenCalledTimes(1);
        expect(setCancelEventId).toHaveBeenCalledTimes(1);
    });
});