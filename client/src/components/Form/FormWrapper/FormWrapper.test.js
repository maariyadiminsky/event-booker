import { render } from '../../../tests/utils';
import userEvent from '@testing-library/user-event';

import { 
    MOCK, 
    SUBMIT,
    NEVERMIND,
    ERROR_DATA_NO_RESPONSE, 
    ERROR_SERVER_ERROR
} from '../../../const';

import FormWrapper from './';

describe('<FormWrapper />', () => {
    let children;
    let topContentMock;
    let handleOnSubmit;
    beforeAll(() => {
        children = (
            <div>{MOCK.WORKS_TEXT}</div>
        );
        topContentMock = (
            <div>Top Content</div>
        );
        handleOnSubmit = jest.fn();
    });

    it('renders component', () => {
        const { getByText } = render(
            <FormWrapper
                topContent={topContentMock}
                handleOnSubmit={handleOnSubmit}
            >
                {children}
            </FormWrapper>
        );

        const childrenContent = getByText(MOCK.WORKS_TEXT);
        const topContent = getByText('Top Content');

        expect(childrenContent).toBeInTheDocument();
        expect(topContent).toBeInTheDocument();
    });

    it('renders errors if they exist', () => {
        const errorsMock = [{ message: ERROR_DATA_NO_RESPONSE(true) }, { message: ERROR_SERVER_ERROR(true, 500) }];

        const { getByText } = render(
            <FormWrapper
                topContent={topContentMock}
                handleOnSubmit={handleOnSubmit}
                errors={errorsMock}
            >
                {children}
            </FormWrapper>
        );

        const firstErrorDiv = getByText(errorsMock[0].message);
        const secondErrorDiv = getByText(errorsMock[1].message);

        expect(firstErrorDiv).toBeInTheDocument();
        expect(secondErrorDiv).toBeInTheDocument();
    });

    it('renders buttons and triggers on press only if user can cancel', () => {
        const handleCancelButton = jest.fn();

        const { getByRole } = render(
            <FormWrapper
                topContent={topContentMock}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={handleCancelButton}
            >
                {children}
            </FormWrapper>
        );

        const cancelButton = getByRole('button', { name: NEVERMIND });

        expect(cancelButton).toBeInTheDocument();
        
        userEvent.click(cancelButton);

        expect(handleOnSubmit).toHaveBeenCalledTimes(1);
    });
});