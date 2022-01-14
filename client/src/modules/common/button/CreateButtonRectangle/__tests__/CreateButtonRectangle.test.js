import userEvent from '@testing-library/user-event';
import { render } from '@modules/app/setupTests';

import { MOCK } from '@modules/common/const';

import CreateButtonRectangle from '@modules/common/button/CreateButtonRectangle';

describe('<CreateButtonRectangle />', () => {
    let onClick;

    beforeAll(() => {
        onClick = jest.fn();
    });

    it('renders component', () => {
        const { getByText } = render(
            <CreateButtonRectangle 
                text={MOCK.BUTTON_TEXT}
                onClick={onClick}
            />
        );

        const button = getByText(MOCK.BUTTON_TEXT);

        expect(button).toBeInTheDocument();
    });

    it('handles callback', () => {
        const { getByText } = render(
            <CreateButtonRectangle 
                text={MOCK.BUTTON_TEXT}
                onClick={onClick}
            />
        );

        const button = getByText(MOCK.BUTTON_TEXT);

        userEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

});