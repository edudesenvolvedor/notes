import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {getListNotes} from "../lib/data/getListNotes.tsx";

interface Note {
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

    useEffect(() => {
        const listNotes = getListNotes();
        setNotes(listNotes);
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