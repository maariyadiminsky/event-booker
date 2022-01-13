import { render } from '../../../tests/utils';

import { MOCK, SUCCESS } from '@modules/common/const';

import EventAlert, { setMessage } from '@modules/events/components/EventAlert';

describe('<EventAlert />', () => {
    it('renders component', () => {
        const message = 'has been created!';
        const { getByText } = render(
            <EventAlert 
                alertType={SUCCESS}
                title={MOCK.WORKS_TEXT}
                eventTitle={MOCK.NAME}
                message={message}
            />
        );

        const titlePTag = getByText(MOCK.WORKS_TEXT);
        const messagePTag = getByText(setMessage(MOCK.NAME, message));
        
        expect(titlePTag).toBeInTheDocument();
        expect(messagePTag).toBeInTheDocument();
    });
});