import { render, screen } from '../../../tests/utils';

import { ACCOUNT_CREATED_MESSAGE, SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE } from '../../../const';

import NotificationAlt from './';

describe('<NotificationAlt />', () => {
    it('renders component with correct icon and text', () => {
        const icon = '🔥';
        render(
            <NotificationAlt 
                icon={icon}
                topText={ACCOUNT_CREATED_MESSAGE}
                bottomText={SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE}
            />
        );

        const iconElement = screen.getByText(icon);
        const topTextElement = screen.getByText(ACCOUNT_CREATED_MESSAGE);
        const bottomTextElement = screen.getByText(SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE);

        expect(iconElement).toBeInTheDocument();
        expect(topTextElement).toBeInTheDocument();
        expect(bottomTextElement).toBeInTheDocument();
    });
});