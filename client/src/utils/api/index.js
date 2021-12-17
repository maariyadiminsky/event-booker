import { DEFAULT, DEVELOPMENT, PRODUCTION } from '../../const';

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
    exitIfTrue: DEFAULT.BOOL_FALSE,
    isMutation: DEFAULT.BOOL_FALSE, 
    setLoadingState: DEFAULT.NULL,
    setErrorState: DEFAULT.NULL,
    handleErrors: DEFAULT.NULL,
    errorCallback: DEFAULT.NULL,
    dataCallback: DEFAULT.NULL,
    query: DEFAULT.NULL,
    queryVariables: DEFAULT.NULL,
}

// note: although similar to useAPIQuery it has more options and only called on button press
export const apiBaseCall = async({
    exitIfTrue = apiBaseParams.exitIfTrue, queryToCheck = apiBaseParams.queryToCheck, queryVariables = apiBaseParams.queryVariables, 
    setLoadingState = apiBaseParams.setLoadingState, handleErrors = apiBaseParams.handleErrors, setErrorState = apiBaseParams.setErrorState, 
    errorCallback = apiBaseParams.errorCallback, isMutation = apiBaseParams.isMutation, dataCallback = apiBaseParams.dataCallback
}) => {
    if (exitIfTrue) return Promise.resolve();

    setLoadingState(DEFAULT.BOOL_TRUE);

    try {
        const response = await queryToCheck({ variables: queryVariables });

        handleErrors(response, setErrorState, errorCallback, isMutation);

        const { data, loading } = response;

        dataCallback(data);

        setLoadingState(loading);
    } catch(err) {
        console.log(err);
        throw err;
    }
};