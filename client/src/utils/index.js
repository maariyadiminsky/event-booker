// so elements with multiple event handlers aren't unnecessarily 
// called more than once(ie. SyntheticEvent Bubbling)
export const shouldStopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
        event.stopPropagation();

        return true;
    }

    return false;
}

export const sortQueryData = (dataFromQuery, isBooking = false) => {
    // sort data after making a copy
    const mutableData = [...dataFromQuery];

    // sort upcoming data at the top
    return mutableData.sort((itemOne, itemTwo) => {
        const firstItem = isBooking ? itemOne.event.date : itemOne;
        const secondItem = isBooking ? itemTwo.event.date : itemTwo;

        return new Date(firstItem.date) - new Date(secondItem.date)
    });
}