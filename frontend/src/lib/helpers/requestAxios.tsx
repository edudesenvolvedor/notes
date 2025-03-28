import {Axios} from "axios";
import {getAccessToken} from "./session.ts";

export const RequestAxios = () => {
    const token = getAccessToken();

    return new Axios({
        baseURL: 'http://localhost:3000',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
}