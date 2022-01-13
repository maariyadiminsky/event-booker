import { render } from '../../../tests/utils';

import { MOCK, ERROR } from '@modules/common/const';

import FormAlert, { getFormAlertColorCSS } from '@modules/common/form/FormAlert';

describe('<FormAlert />', () => {
    it('renders component with correct color and children', () => {
        const { getByRole } = render(
            <FormAlert
                type={ERROR}
            >
                <div>{MOCK.WORKS_TEXT}</div>
            </FormAlert>
        );

        const alertDiv = getByRole('alert');

        expect(alertDiv).toBeInTheDocument();
        expect(alertDiv.className).toBe(getFormAlertColorCSS(ERROR));
        expect(alertDiv.textContent).toBe(MOCK.WORKS_TEXT);
    });
});