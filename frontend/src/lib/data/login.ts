import {RequestAxios} from "../helpers/requestAxios.tsx";
import {createSession} from "../helpers/session.ts";

export const login = async (email: string, password: string) => {
    const auth = await RequestAxios().post("/auth/login", JSON.stringify({ email, password }));

    const authData= JSON.parse(auth.data);

    createSession(auth.data);

    return !!authData?.success;
}