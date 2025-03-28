import {RequestAxios} from "../helpers/requestAxios.tsx";

export const createNotesRequest = async(title: string, content: string) => {
    const request = await RequestAxios().post(`/notes`, JSON.stringify(
        {
            title,
            content,
        }
    ));

    return request.status === 201 ? request.data : null
}