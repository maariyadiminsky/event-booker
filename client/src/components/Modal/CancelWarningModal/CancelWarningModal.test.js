import { render } from '../../../tests/utils';

import { CANCEL_BOOKING, ARE_YOU_SURE } from '../../../const';

import CancelWarningModal from './';

describe('<CancelWarningModal />', () => {
    let portalRoot;
    beforeAll(() => {
        portalRoot = document.getElementById('modal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal');
            document.body.appendChild(portalRoot);
        }
    });

    it('renders component', () => {
        const { getByText } = render(
            <CancelWarningModal
                handleOnSubmit={jest.fn()}
                toggleModal={jest.fn()}
                header={CANCEL_BOOKING}
            />
        );

        const header = getByText(CANCEL_BOOKING);
        const contentAreYouSureText = getByText(ARE_YOU_SURE);

        expect(header).toBeInTheDocument();
        expect(contentAreYouSureText).toBeInTheDocument();
    });
});