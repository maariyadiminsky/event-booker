import { render } from '@modules/app/setupTests';

import { CANCEL_BOOKING, ARE_YOU_SURE } from '@modules/common/const';

import CancelWarningModal from '@modules/common/modal/CancelWarningModal';

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