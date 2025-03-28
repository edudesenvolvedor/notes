import {RequestAxios} from "../helpers/requestAxios.tsx";

export const SignUp = async (name: string, email: string, password: string) => {
    try {
        const user = await RequestAxios().post("/auth/signup", JSON.stringify({ name, email, password }));
        window.sessionStorage.setItem('session', JSON.stringify(user.data));
        return true;
    } catch (error) {
        console.error('Erro ao fazer o signUp:', error);
        throw error;
    }
}