import { render } from '../../../tests/utils';
import userEvent from '@testing-library/user-event';

import { MOCK } from '../../../const';

import CreateButtonRectangle from './';

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