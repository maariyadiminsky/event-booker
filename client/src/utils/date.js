export const getTodaysDate = () => {
    const todaysDate = new Date();

    return todaysDate.toISOString().split("T")[0];
}