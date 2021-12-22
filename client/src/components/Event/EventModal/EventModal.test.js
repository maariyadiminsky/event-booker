import { render } from '../../../tests/utils';

import { CREATE_AN_EVENT } from '../../../const';

import EventModal from './';

describe('<EventModal />', () => {
    let toggleModal;
    let handleOnSubmit;

    let portalRoot;

    beforeAll(() => {
        toggleModal = jest.fn();
        handleOnSubmit = jest.fn();

        portalRoot = document.getElementById('modal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal');
            document.body.appendChild(portalRoot);
        }
    });

    it('renders component', () => {
        const { getByText } = render(
            <EventModal 
                handleOnSubmit={handleOnSubmit}
                toggleModal={toggleModal}
            />
        );

        const header = getByText(CREATE_AN_EVENT);
        const title = getByText('Title');
        const description = getByText('Description');
        const date = getByText('Date');
        const price = getByText('Price');

        expect(header).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(date).toBeInTheDocument();
        expect(price).toBeInTheDocument();
    });
});