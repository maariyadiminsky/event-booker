import { render } from '../../../tests/utils';

import { ERROR_DATA_NO_RESPONSE, ERROR_SERVER_ERROR } from '../../../const';

import FormErrors from './';

describe('<FormErrors />', () => {
    it('renders component with all error messages', () => {
        const errorsMock = [{ message: ERROR_DATA_NO_RESPONSE(true) }, { message: ERROR_SERVER_ERROR(true, 500) }];

        const { getByText } = render(
            <FormErrors errors={errorsMock}/>
        );

        const firstErrorDiv = getByText(ERROR_DATA_NO_RESPONSE(true));
        const secondErrorDiv = getByText(ERROR_SERVER_ERROR(true, 500));

        expect(firstErrorDiv).toBeInTheDocument();
        expect(secondErrorDiv).toBeInTheDocument();
    });
});