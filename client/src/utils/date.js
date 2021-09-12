import moment from "moment";

export const getTodaysDate = () => moment().format("YYYY-MM-DD");

export const getDateInCorrectFormat = (date) => {
    return moment(date).format("MMM Do YYYY");
}