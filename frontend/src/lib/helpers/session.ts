export const createSession = (data: string) => {
    window.sessionStorage.setItem('session', data);
    return !!sessionStorage.getItem('session');
}

export const isSession = () => {
    const session = window.sessionStorage.getItem('session');

    if(!session) return false;

    const data = JSON.parse(session);

    return !!data?.access_token;
}

export const destroySession = () => {
    window.sessionStorage.removeItem('session');
}

export const getAccessToken = () => {
    const session = window.sessionStorage.getItem('session');
    if(!session) return null;
    return JSON.parse(session).access_token;
}