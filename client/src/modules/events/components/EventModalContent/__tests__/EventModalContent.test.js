import { render } from '../../../tests/utils';

import { 
    NEVERMIND, 
    SUBMIT,
    ERROR_DATA_NO_RESPONSE,
    ERROR_SERVER_ERROR
} from '@modules/common/const';

import EventModalContent from '@modules/events/components/EventModalContent';

describe('<EventModalContent />', () => {
    let handleOnSubmit;
    let handleCancelButton;
    beforeAll(() => {
        handleOnSubmit = jest.fn();
        handleCancelButton = jest.fn();
    });

    it('renders component', () => {
        const { getByRole, getByText } = render(
            <EventModalContent
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={handleCancelButton}
            />
        );

        const title = getByText('Title');
        const description = getByText('Description');
        const date = getByText('Date');
        const price = getByText('Price');
        const cancelButton = getByRole('button', { name: NEVERMIND });
        const confirmButton = getByRole('button', { name: SUBMIT });

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(date).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();
    });

    it('renders errors if they exist', () => {
        const errorsMock = [{ message: ERROR_DATA_NO_RESPONSE(true) }, { message: ERROR_SERVER_ERROR(true, 500) }];
        const { getByText } = render(
            <EventModalContent
                errors={errorsMock}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={handleCancelButton}
            />
        );

        const errorOne = getByText(errorsMock[0].message);
        const errorTwo = getByText(errorsMock[1].message);

        expect(errorOne).toBeInTheDocument();
        expect(errorTwo).toBeInTheDocument();
    });
});