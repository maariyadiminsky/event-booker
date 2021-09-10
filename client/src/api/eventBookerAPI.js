import axios from "axios";

import { findBaseURL } from "../utils";

export default axios.create({
    baseURL: findBaseURL(),
    headers: {
        "Content-Type": "application/json",
         Accept: "application/json"
    }
});