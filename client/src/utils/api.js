import { DEVELOPMENT, PRODUCTION } from '../const';

export const findBaseURL = () => {
    if (process.env.NODE_ENV === PRODUCTION) {
        return process.env.REACT_APP_PROD_EVENT_BOOKER_API_URL;
    } else if (process.env.NODE_ENV === DEVELOPMENT) {
        return process.env.REACT_APP_DEV_EVENT_BOOKER_API_URL;
    } 
    
    return '';
}