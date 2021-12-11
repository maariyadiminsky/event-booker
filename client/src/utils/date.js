import moment from 'moment';

export const getTodaysDate = () => moment.utc().format('YYYY-MM-DD');

export const getDateInCorrectFormat = (date) => moment.utc(date).format('MMM Do YYYY');

export const isDateBeforeToday = (date) => {
    if (isSameAsToday(date)) return false;

    return moment.utc(date).isBefore();
}

export const isSameAsToday = (date) => isSameDate(moment.utc(date), moment.utc());

const isSameDate = (firstDate, secondDate) => firstDate.isSame(secondDate, 'day');