import { 
    colors,
    getRandomColor, 
    getColorForAlertType 
} from '@modules/common/utils/colors';
import {
    SUCCESS_COLOR,
    WARNING_COLOR,
    ERROR_COLOR,
    INFORMATIVE_COLOR,
    SUCCESS,
    WARNING,
    ERROR,
    INFORMATIVE
} from '@modules/common/const';

describe('getRandomColor', () => {
    it('returns a random color from colors list', () => {
        const input = getRandomColor();
        const input2 = getRandomColor();

        expect(colors).toContain(input);
        expect(colors).toContain(input2);
    });
});

describe('getColorForAlertType', () => {
    it('returns default color if no alert type passed in', () => {
        const input = getColorForAlertType();
        const output = SUCCESS_COLOR;
        const incorrectOutput = ERROR_COLOR;

        expect(input).toBe(output);
        expect(input).not.toBe(incorrectOutput);
    });

    it('returns correct color depending on alert type', () => {
        expect(getColorForAlertType(SUCCESS)).toBe(SUCCESS_COLOR);
        expect(getColorForAlertType(ERROR)).toBe(ERROR_COLOR);
        expect(getColorForAlertType(WARNING)).toBe(WARNING_COLOR);
        expect(getColorForAlertType(INFORMATIVE)).toBe(INFORMATIVE_COLOR);
    });
});