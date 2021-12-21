import { render, screen, fireEvent } from '../../../tests/utils';
import userEvent from '@testing-library/user-event';

import { MOCK } from '../../../const';

import NavMobileButton from './';

describe('<NavMobileButton />', () => {
    it('calls callback when clicked', () => {
        const handleOnClick = jest.fn(() => MOCK.WORKS_TEXT);
        render(
            <NavMobileButton handleOnClick={handleOnClick} />
        );

        const button = screen.getByRole('button');

        userEvent.click(button);

        expect(handleOnClick).toHaveBeenCalledTimes(1);

        userEvent.click(button);

        expect(handleOnClick).toHaveBeenCalledTimes(2);
    });
});