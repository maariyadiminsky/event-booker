import { render } from '../../../tests/utils';

import { MOCK } from '../../../const';

import FormOptions, { getEventNameForBooking } from './';

describe('<FormOptions />', () => {
    let options;
    let onChange;
    beforeAll(() => {
        options = [
            {
                _id: '0',
                title: 'Sushi Event',
                price: 70,
                date: '2021-09-15T00:00:00.000Z'
            },
            {
                _id: '1',
                title: 'Car Event',
                price: 25,
                date: '2021-09-16T00:00:00.000Z'
            },
            {
                _id: '2',
                title: 'Concert Event',
                price: 200,
                date: '2021-09-17T00:00:00.000Z'
            }
        ];

        onChange = jest.fn();
    });
    it('renders component', () => {
        const { getByRole, getByText } = render(
            <FormOptions
                name= {MOCK.NAME}
                options={options}
                onChange={onChange}
            />
        );

        const selector = getByRole('combobox');
        const firstOption = getByText(options[0].title);
        const secondOption = getByText(options[1].title);
        const thirdOption = getByText(options[2].title);

        expect(selector).toBeInTheDocument();
        expect(firstOption).toBeInTheDocument();
        expect(secondOption).toBeInTheDocument();
        expect(thirdOption).toBeInTheDocument();
    });

    it ('renders the correct option name', () => {
        const { getByText, queryByText, rerender } = render(
            <FormOptions
                name= {MOCK.NAME}
                options={options}
                onChange={onChange}
            />
        );

        const firstEvent = options[0];
        const optionIfBooking = getEventNameForBooking(firstEvent.title, firstEvent.price, firstEvent.date);
        const sushiEventOption = getByText(firstEvent.title);
        const sushiEventBookingOption = queryByText(optionIfBooking);
        
        expect(sushiEventOption).toBeInTheDocument();
        expect(sushiEventBookingOption).not.toBeInTheDocument();

        rerender(
            <FormOptions
                name= {MOCK.NAME}
                options={options}
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