import userEvent from '@testing-library/user-event';
import { render } from '@modules/app/setupTests';

import { MOCK } from '@modules/common/const';

import Button from '@modules/common/button/Button';

describe('<Button />', () => {
    let handleOnClick;
    let button;
    beforeEach(() => {
        handleOnClick = jest.fn();

        const { getByRole } = render(
            <Button 
                buttonCSS={MOCK.CLASS}
                handleOnClick={handleOnClick}
            >
                {MOCK.BUTTON_TEXT}
            </Button>
        );

        button = getByRole('button');
    });

    it('renders component', () => {
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe(MOCK.BUTTON_TEXT);
        expect(button.className).toBe(MOCK.CLASS);
    });

    it('handles callback when clicked', () => {
        expect(button).toBeInTheDocument();

        userEvent.click(button);

        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
});