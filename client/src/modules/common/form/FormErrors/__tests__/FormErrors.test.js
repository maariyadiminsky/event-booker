import { render } from '../../../tests/utils';

import { ERROR_DATA_NO_RESPONSE, ERROR_SERVER_ERROR } from '@modules/common/const';

import FormErrors from '@modules/common/form/FormErrors';

describe('<FormErrors />', () => {
    it('renders component with all error messages', () => {
        const errorsMock = [{ message: ERROR_DATA_NO_RESPONSE(true) }, { message: ERROR_SERVER_ERROR(true, 500) }];

        const { getByText } = render(
            <FormErrors errors={errorsMock}/>
        );

        const firstErrorDiv = getByText(errorsMock[0].message);
        const secondErrorDiv = getByText(errorsMock[1].message);

        expect(firstErrorDiv).toBeInTheDocument();
        expect(secondErrorDiv).toBeInTheDocument();
    });
});