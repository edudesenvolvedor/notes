import {RequestAxios} from "../helpers/requestAxios.tsx";

export const getListNotesRequest = async () => {
    const dataNotes = await RequestAxios().get("/notes");

    const jsonDataNotes =JSON.parse(dataNotes.data).notes;

    if (!Array.isArray(jsonDataNotes)) {
        console.error("jsonDataNotes não é um array:", jsonDataNotes);
        return;
    }

    const resultado = jsonDataNotes.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content
    }));

    return resultado;
}