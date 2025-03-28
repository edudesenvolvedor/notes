import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {getListNotesRequest} from "../lib/data/getListNotesRequest.ts";

export interface Note {
    id: number;
    title: string;
    content: string;
}

interface NotesContextType {
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    const getNotes = async () => {
        setNotes(await getListNotesRequest() as Note[]);
    }

    useEffect(() => {
        getNotes().then()
    }, [])

    return (
        <NotesContext.Provider value={
            {
                notes,
                setNotes
            }
        }>
            {children}
        </NotesContext.Provider>
    )

}