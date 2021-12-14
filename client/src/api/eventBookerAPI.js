import axios from 'axios';

import { findBaseURL } from '../utils/api';
import { DEFAULT } from '../const';

const baseHeaders = {
    'Content-Type': 'application/json',
     Accept: 'application/json'
}
const authHeaders = (token = DEFAULT.NULL) => ({
    ...baseHeaders,
    'Authorization': `Bearer ${token}`
})

export const eventBookerAPI = (token = DEFAULT.NULL) => (
    axios.create({
        baseURL: findBaseURL(),
        headers: (token ? authHeaders(token) : baseHeaders)
    })
);