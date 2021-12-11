import { isDateBeforeToday } from './date';

export const sortQueryData = (dataFromQuery) => {
    // sort data after making a copy
    const mutableData = [...dataFromQuery];

    // sort upcoming data at the top
    return mutableData.sort((dataOne, dataTwo) => {
        // make sure expired datas are always at the bottom
        if (isDateBeforeToday(dataOne.date) && !isDateBeforeToday(dataTwo.date)) {
            return 1;
        } else if (!isDateBeforeToday(dataOne.date) && isDateBeforeToday(dataTwo.date)) {
            return -1;
        }

        return new Date(dataOne.date) - new Date(dataTwo.date)
    });
}