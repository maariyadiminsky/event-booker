import { DEVELOPMENT, PRODUCTION } from '../const';

export const findBaseURL = () => {
    if (process.env.NODE_ENV === PRODUCTION) {
        return process.env.REACT_APP_PROD_EVENT_BOOKER_API_URL;
    } else if (process.env.NODE_ENV === DEVELOPMENT) {
        return process.env.REACT_APP_DEV_EVENT_BOOKER_API_URL;
    } 
    
    return '';
}

// allows me to call only the params I want instead
// of writing null for each param I don't need--idea from C#.
export const apiBaseParams = {
    exitIfTrue: false,
    isMutation: false, 
    setLoadingState: () => {},
    setErrorState: () => {},
    handleErrors: () => {},
    errorCallback: () => {},
    dataCallback: () => {},
    query: null,
    queryVariables: null,
}

// note: although similar to useAPIQuery it has more options and only called on button press
export const apiBaseCall = async ({
    exitIfTrue, queryToCheck, queryVariables, 
    setLoadingState, handleErrors, setErrorState, 
    errorCallback, isMutation, dataCallback
}) => {
    if (exitIfTrue) return;

    try {
        const response = await queryToCheck({ variables: queryVariables });

        handleErrors(response, setErrorState, errorCallback, isMutation);

        const { data, loading } = response;

        dataCallback(data);

        if (setLoadingState) setLoadingState(loading);
    } catch(err) {
        console.log(err);
        throw err;
    }
};