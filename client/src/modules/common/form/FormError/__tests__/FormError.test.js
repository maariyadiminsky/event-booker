import { render } from '../../../tests/utils';

import { ERROR_DATA_NO_RESPONSE } from '@modules/common/const';

import FormError from '@modules/common/form/FormError';

describe('<FormError />', () => {
    it('renders component with error message', () => {
        const { getByText } = render(
            <FormError error={ERROR_DATA_NO_RESPONSE(true)}/>
        );

        const errorDiv = getByText(ERROR_DATA_NO_RESPONSE(true));

        expect(errorDiv).toBeInTheDocument();
    });
});