import { DEFAULT_PARAM, DEVELOPMENT, PRODUCTION } from '../const';

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
    exitIfTrue: DEFAULT_PARAM.BOOL_FALSE,
    isMutation: DEFAULT_PARAM.BOOL_FALSE, 
    setLoadingState: DEFAULT_PARAM.NULL,
    setErrorState: DEFAULT_PARAM.NULL,
    handleErrors: DEFAULT_PARAM.NULL,
    errorCallback: DEFAULT_PARAM.NULL,
    dataCallback: DEFAULT_PARAM.NULL,
    query: DEFAULT_PARAM.NULL,
    queryVariables: DEFAULT_PARAM.NULL,
}

// note: although similar to useAPIQuery it has more options and only called on button press
export const apiBaseCall = async ({
    exitIfTrue = apiBaseParams.exitIfTrue, queryToCheck = apiBaseParams.queryToCheck, queryVariables = apiBaseParams.queryVariables, 
    setLoadingState = apiBaseParams.setLoadingState, handleErrors = apiBaseParams.handleErrors, setErrorState = apiBaseParams.setErrorState, 
    errorCallback = apiBaseParams.errorCallback, isMutation = apiBaseParams.isMutation, dataCallback = apiBaseParams.dataCallback
}) => {
    if (exitIfTrue) return;

    setLoadingState(DEFAULT_PARAM.BOOL_TRUE);

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