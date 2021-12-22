import { render } from '../../../tests/utils';

import { 
    ARE_YOU_SURE, 
    YES_IM_SURE,
    NEVERMIND 
} from '../../../const';

import CancelWarningModalContent from './';

describe('<CancelWarningModalContent />', () => {
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
            <CancelWarningModalContent
                handleOnSubmit={jest.fn()}
                handleCancelButton={jest.fn()}
            />
        );

        const contentAreYouSureText = getByText(ARE_YOU_SURE);
        const confirmButtonText = getByText(YES_IM_SURE);
        const cancelButtonText = getByText(NEVERMIND);

        expect(contentAreYouSureText).toBeInTheDocument();
        expect(confirmButtonText).toBeInTheDocument();
        expect(cancelButtonText).toBeInTheDocument();
    });
});