import axios from "axios";

import { findBaseURL } from "../utils/api";

const baseHeaders = {
    "Content-Type": "application/json",
     Accept: "application/json"
}
const authHeaders = (token) => ({
    ...baseHeaders,
    "Authorization": `Bearer ${token}`
})

export const eventBookerAPI = (token = null) => (
    axios.create({
        baseURL: findBaseURL(),
        headers: (token ? authHeaders(token) : baseHeaders)
    })
);