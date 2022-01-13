import { render } from '../../../tests/utils';
import userEvent from '@testing-library/user-event';

import { MOCK } from '@modules/common/const';

import NavItem from '@modules/navigation/components/NavItem';

describe('<NavItem />', () => {
    it('renders NavItem component', () => {
        const { getByRole, getByTestId } = render(
            <NavItem
                buttonPath={MOCK.PATH}
                className={MOCK.CLASS}
            >
                {MOCK.BUTTON_TEXT}
            </NavItem>
        );

        const button = getByRole('link');
        const innerDiv = getByTestId('nav-item')

        expect(button.textContent).toBe(MOCK.BUTTON_TEXT);
        expect(button).toHaveAttribute('href', MOCK.PATH);
        expect(innerDiv.className).toBe(MOCK.CLASS);
    });

    it('calls callback when clicked', () => {
        const handleOnClick = jest.fn(() => MOCK.WORKS_TEXT);
        const { getByRole } = render(
            <NavItem
                handleOnClick={handleOnClick}
                className={MOCK.CLASS}
            >
                {MOCK.BUTTON_TEXT}
            </NavItem>
        );

        const button = getByRole('link');

        userEvent.click(button);

        expect(handleOnClick).toHaveBeenCalledTimes(1);

        userEvent.click(button);

        expect(handleOnClick).toHaveBeenCalledTimes(2);
    });
});