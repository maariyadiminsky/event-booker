import { render } from '../../../tests/utils';

import { MOCK, ERROR } from '../../../const';

import FormAlert, { getFormAlertColorCSS } from './';

describe('<FormAlert />', () => {
    it('renders component with correct color and children', () => {
        const { getByRole } = render(
            <FormAlert
                type={ERROR}
                children={<div>{MOCK.WORKS_TEXT}</div>}
            />
        );

        const alertDiv = getByRole('alert');

        expect(alertDiv).toBeInTheDocument();
        expect(alertDiv.className).toBe(getFormAlertColorCSS(ERROR));
        expect(alertDiv.textContent).toBe(MOCK.WORKS_TEXT);
    });
});