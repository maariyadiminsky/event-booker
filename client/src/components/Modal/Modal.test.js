import  { render, screen } from '../../tests/utils';
import userEvent from '@testing-library/user-event';

import { 
    MOCK, 
    BOOK_AN_EVENT,
    NEVERMIND
} from '../../const';

import Modal from './';

describe('<Modal />', () => {
    let contentMock;
    let handleOnSubmit;
    let handleCancelModal;

    let portalRoot;

    beforeEach(() => {
        contentMock = <div>{MOCK.WORKS_TEXT}</div>;
        handleOnSubmit = jest.fn();
        handleCancelModal = jest.fn();

        portalRoot = document.getElementById('modal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal');
            document.body.appendChild(portalRoot);
        }
    })
    it('renders component', () => {
        const { getByRole, getByText } = render(
            <Modal 
                header={BOOK_AN_EVENT}
                content={contentMock}
                confirmButtonText={MOCK.BUTTON_TEXT}
                handleCancelModal={handleCancelModal}
                handleOnSubmit={handleOnSubmit}
            />
        );

        const headerDiv = getByText(BOOK_AN_EVENT);
        const contentDiv = getByText(MOCK.WORKS_TEXT);
        const customConfirmButton = getByRole('button', { name: MOCK.BUTTON_TEXT });
        const defaultCancelButton = getByRole('button', { name: NEVERMIND });

        expect(headerDiv).toBeInTheDocument();
        expect(contentDiv).toBeInTheDocument();
        expect(customConfirmButton).toBeInTheDocument();
        expect(defaultCancelButton).toBeInTheDocument();
    });

    it('renders custom submit buttons', () => {
        const customSubmitButtonsMock = (
            <div>
                <button>First Button</button>
                <button>Second Button</button>
            </div>
        );

        const { getByRole } = render(
            <Modal 
                header={BOOK_AN_EVENT}
                content={contentMock}
                confirmButtonText={MOCK.BUTTON_TEXT}
                handleCancelModal={handleCancelModal}
                handleOnSubmit={handleOnSubmit}
                customSubmitButtons={customSubmitButtonsMock}
            />
        );

        const customConfirmButton = getByRole('button', { name: 'First Button' });
        const customCancelButton = getByRole('button', { name: 'Second Button' });

        expect(customConfirmButton).toBeInTheDocument();
        expect(customCancelButton).toBeInTheDocument();
    });

    it('hides submit buttons', () => {
        const { queryByText } = render(
            <Modal 
                header={BOOK_AN_EVENT}
                content={contentMock}
                confirmButtonText={MOCK.BUTTON_TEXT}
                handleCancelModal={handleCancelModal}
                handleOnSubmit={handleOnSubmit}
                hideSubmitButtons
            />
        );

        const customConfirmButton = queryByText(MOCK.BUTTON_TEXT);
        const defaultCancelButton = queryByText(NEVERMIND);

        expect(customConfirmButton).not.toBeInTheDocument();
        expect(defaultCancelButton).not.toBeInTheDocument();
    });

    it('cancels modal when user clicks outside content', () => {
        const { getByTestId } = render(
            <Modal 
                header={BOOK_AN_EVENT}
                content={contentMock}
                confirmButtonText={MOCK.BUTTON_TEXT}
                handleCancelModal={handleCancelModal}
                handleOnSubmit={handleOnSubmit}
            />
        );

        const modal = getByTestId('modal-portal');
        
        userEvent.click(modal);

        expect(handleCancelModal).toHaveBeenCalledTimes(1);
    });

    it('cancels modal when user clicks cancel button', () => {
        const { getByRole } = render(
            <Modal 
                header={BOOK_AN_EVENT}
                content={contentMock}
                confirmButtonText={MOCK.BUTTON_TEXT}
                handleCancelModal={handleCancelModal}
                handleOnSubmit={handleOnSubmit}
            />
        );

        const defaultCancelButton = getByRole('button', { name: NEVERMIND });
        
        userEvent.click(defaultCancelButton);

        expect(handleCancelModal).toHaveBeenCalledTimes(1);
    });

    it('handles callback when user clicks confirm button', () => {
        const { getByRole } = render(
            <Modal 
                header={BOOK_AN_EVENT}
                content={contentMock}
                confirmButtonText={MOCK.BUTTON_TEXT}
                handleCancelModal={handleCancelModal}
                handleOnSubmit={handleOnSubmit}
            />
        );

        const customConfirmButton = getByRole('button', { name: MOCK.BUTTON_TEXT });

        userEvent.click(customConfirmButton);

        expect(handleOnSubmit).toHaveBeenCalledTimes(1);
    });
});