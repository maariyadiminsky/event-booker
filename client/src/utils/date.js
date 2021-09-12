import moment from "moment";

export const getTodaysDate = () => moment.utc().format("YYYY-MM-DD");

export const getDateInCorrectFormat = (date) => moment.utc(date).format("MMM Do YYYY");

export const isDateBeforeToday = (date) => {
    if (isSameDate(moment.utc(date), moment.utc())) return false;

    return moment.utc(date).isBefore();
}

const isSameDate = (firstDate, secondDate) => firstDate.isSame(secondDate, "day");