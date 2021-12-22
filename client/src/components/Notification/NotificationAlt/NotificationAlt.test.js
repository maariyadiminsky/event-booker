import { render } from '../../../tests/utils';

import { ACCOUNT_CREATED_MESSAGE, SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE } from '../../../const';

import NotificationAlt from './';

describe('<NotificationAlt />', () => {
    it('renders component with correct icon and text', () => {
        const icon = '🔥';
        const { getByText } = render(
            <NotificationAlt 
                icon={icon}
                topText={ACCOUNT_CREATED_MESSAGE}
                bottomText={SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE}
            />
        );

        const iconElement = getByText(icon);
        const topTextElement = getByText(ACCOUNT_CREATED_MESSAGE);
        const bottomTextElement = getByText(SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE);

        expect(iconElement).toBeInTheDocument();
        expect(topTextElement).toBeInTheDocument();
        expect(bottomTextElement).toBeInTheDocument();
    });
});