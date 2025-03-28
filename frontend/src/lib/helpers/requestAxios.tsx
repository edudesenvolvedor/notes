import {Axios} from "axios";
import {getAccessToken} from "./session.ts";

export const RequestAxios = () => {
    const token = getAccessToken();

    return new Axios({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
}