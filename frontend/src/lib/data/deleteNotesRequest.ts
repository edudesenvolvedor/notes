import {RequestAxios} from "../helpers/requestAxios.tsx";

export const deleteNotesRequest = async (id: string): Promise<void> => {
    await RequestAxios().delete(`/notes/${id}`);
}