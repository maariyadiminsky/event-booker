import moment from 'moment';

import { 
    getTodaysDate,
    getDateInCorrectFormat,
    isDateBeforeToday,
    isSameAsToday
} from './';

describe('getTodaysDate', () => {
    it('returns accurate date for today', () => {
        const input = getTodaysDate();
        const output = moment.utc().format('YYYY-MM-DD');

        expect(input).toBe(output);
    });
});

describe('getDateInCorrectFormat', () => {
    it('returns correct date in correct format', () => {
        const date = '2021-09-15T00:00:00.000Z';
        const input = getDateInCorrectFormat(date);
        const output = moment.utc(date).format('MMM Do YYYY');

        expect(input).toBe(output);
    });
});

describe('isDateBeforeToday', () => {
    it('returns true if date is before today', () => {
        const date = '2021-09-15T00:00:00.000Z';
        const input = isDateBeforeToday(date);
        const output = true;

        expect(input).toBe(output);
    });

    it('returns false if date is today or after', () => {
        const today = new Date();
        const tomorrow = new Date(Date.now() + (3600 * 1000 * 24));

        const input = isDateBeforeToday(today);
        const input2 = isDateBeforeToday(tomorrow);
        const output = false;

        expect(input).toBe(output);
        expect(input2).toBe(output);
    });
});

describe('isSameAsToday', () => {
    it('returns true if today is the same day as today', () => {
        const today = new Date();
        const tomorrow = new Date(Date.now() + (3600 * 1000 * 24));

        const input = isSameAsToday(today);
        const input2 = isSameAsToday(tomorrow);
        const outputTrue = true;
        const outputFalse = false;

        expect(input).toBe(outputTrue);
        expect(input2).toBe(outputFalse);
    });
});