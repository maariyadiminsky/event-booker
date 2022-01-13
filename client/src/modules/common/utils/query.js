import { DEFAULT } from '@modules/common/const';

export const sortQueryData = (dataFromQuery = DEFAULT.UNDEFINED, isBooking = DEFAULT.BOOL_FALSE) => {
    // sort data after making a copy
    const mutableData = [...dataFromQuery];

    // sort upcoming data at the top
    return mutableData.sort((itemOne, itemTwo) => {
        const firstItem = isBooking ? itemOne.event.date : itemOne;
        const secondItem = isBooking ? itemTwo.event.date : itemTwo;

        return new Date(firstItem.date) - new Date(secondItem.date)
    });
}