import { render } from '../../../tests/utils';

import { MOCK } from '@modules/common/const';
import { eventsMockData } from '@modules/events/__tests__/mocks';

import FormOptions, { getEventNameForBooking } from '@modules/common/form/FormOptions';

describe('<FormOptions />', () => {
    let onChange;
    beforeAll(() => {
        onChange = jest.fn();
    });
    it('renders component', () => {
        const { getByRole, getByText } = render(
            <FormOptions
                name= {MOCK.NAME}
                options={eventsMockData}
                onChange={onChange}
            />
        );

        const selector = getByRole(MOCK.SELECTOR);
        const firstOption = getByText(eventsMockData[0].title);
        const secondOption = getByText(eventsMockData[1].title);
        const thirdOption = getByText(eventsMockData[2].title);

        expect(selector).toBeInTheDocument();
        expect(firstOption).toBeInTheDocument();
        expect(secondOption).toBeInTheDocument();
        expect(thirdOption).toBeInTheDocument();
    });

    it ('renders the correct option name', () => {
        const { getByText, queryByText, rerender } = render(
            <FormOptions
                name= {MOCK.NAME}
                options={eventsMockData}
                onChange={onChange}
            />
        );

        const firstEvent = eventsMockData[0];
        const optionIfBooking = getEventNameForBooking(firstEvent.title, firstEvent.price, firstEvent.date);
        const sushiEventOption = getByText(firstEvent.title);
        const sushiEventBookingOption = queryByText(optionIfBooking);
        
        expect(sushiEventOption).toBeInTheDocument();
        expect(sushiEventBookingOption).not.toBeInTheDocument();

        rerender(
            <FormOptions
                name= {MOCK.NAME}
                options={eventsMockData}
                onChange={onChange}
                isBooking={true}
            />
        );

        const sushiBookingEventOption = queryByText(firstEvent.title);
        const sushiBookingEventBookingOption = getByText(optionIfBooking);

        expect(sushiBookingEventOption).not.toBeInTheDocument();
        expect(sushiBookingEventBookingOption).toBeInTheDocument();
    });
});