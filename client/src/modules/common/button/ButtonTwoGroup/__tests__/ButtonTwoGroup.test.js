import userEvent from '@testing-library/user-event';
import { render } from '@modules/app/setupTests';

import { 
    NEVERMIND, 
    SUBMIT,
    CANCEL,
    CONFIRM 
} from '@modules/common/const';

import ButtonTwoGroup from '@modules/common/button/ButtonTwoGroup';

describe('<ButtonTwoGroup />', () => {
    let handleCancel;
    let handleConfirm;

    beforeAll(() => {
        handleConfirm = jest.fn();
        handleCancel = jest.fn();
    });

    it('renders component', () => {
        const { getByRole } = render(
            <ButtonTwoGroup 
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
            />
        );

        const confirmButton = getByRole('button', { name: SUBMIT });
        const cancelButton = getByRole('button', { name: NEVERMIND });

        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('renders buttons with custom text', () => {
        const { getByRole } = render(
            <ButtonTwoGroup 
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                cancelText={CANCEL}
                confirmText={CONFIRM}
            />
        );

        const confirmButton = getByRole('button', { name: CONFIRM });
        const cancelButton = getByRole('button', { name: CANCEL });

        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('handles both button callbacks', () => {
        const { getByRole } = render(
            <ButtonTwoGroup 
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                cancelText={CANCEL}
                confirmText={CONFIRM}
            />
        );

        const confirmButton = getByRole('button', { name: CONFIRM });
        const cancelButton = getByRole('button', { name: CANCEL });

        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        userEvent.click(cancelButton);

        expect(handleCancel).toHaveBeenCalledTimes(1);

        userEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledTimes(1);
    });

});