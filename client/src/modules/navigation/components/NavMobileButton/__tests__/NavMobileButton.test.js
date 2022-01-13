import { render } from '../../../tests/utils';
import userEvent from '@testing-library/user-event';

import { MOCK } from '@modules/common/const';

import NavMobileButton from '@modules/navigation/components/NavMobileButton';

describe('<NavMobileButton />', () => {
    it('calls callback when clicked', () => {
        const handleOnClick = jest.fn(() => MOCK.WORKS_TEXT);
        const { getByRole } = render(<NavMobileButton handleOnClick={handleOnClick} />);

        const button = getByRole('button');

        userEvent.click(button);

        expect(handleOnClick).toHaveBeenCalledTimes(1);

        userEvent.click(button);

        expect(handleOnClick).toHaveBeenCalledTimes(2);
    });
});