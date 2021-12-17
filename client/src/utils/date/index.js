import moment from 'moment';

import { DEFAULT } from '../../const';

export const getTodaysDate = () => moment.utc().format('YYYY-MM-DD');

export const getDateInCorrectFormat = (date = DEFAULT.STRING) => moment.utc(date).format('MMM Do YYYY');

export const isDateBeforeToday = (date = DEFAULT.STRING) => {
    if (isSameAsToday(date)) return false;

    return moment.utc(date).isBefore();
}

export const isSameAsToday = (date = DEFAULT.STRING) => isSameDate(moment.utc(date), moment.utc());

const isSameDate = (firstDate = DEFAULT.STRING, secondDate = DEFAULT.STRING) => firstDate.isSame(secondDate, 'day');