import moment from 'moment';

import { DEFAULT_PARAM } from '../const';

export const getTodaysDate = () => moment.utc().format('YYYY-MM-DD');

export const getDateInCorrectFormat = (date = DEFAULT_PARAM.STRING) => moment.utc(date).format('MMM Do YYYY');

export const isDateBeforeToday = (date = DEFAULT_PARAM.STRING) => {
    if (isSameAsToday(date)) return false;

    return moment.utc(date).isBefore();
}

export const isSameAsToday = (date = DEFAULT_PARAM.STRING) => isSameDate(moment.utc(date), moment.utc());

const isSameDate = (firstDate = DEFAULT_PARAM.STRING, secondDate = DEFAULT_PARAM.STRING) => firstDate.isSame(secondDate, 'day');