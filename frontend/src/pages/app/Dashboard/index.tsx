import {useContext} from "react";
import {Button, DropdownMenu} from "@radix-ui/themes";
import {NotesContext} from "../../../contexts/NotesContext.tsx";
import {Note} from "../../../components/Note.tsx";
import {ButtonDialogCreateNote} from "../../../components/ButtonDialogCreateNote.tsx";
import {PanelEmptyNotes} from "../../../components/PanelEmptyNotes.tsx";
import {destroySession} from "../../../lib/helpers/session.ts";
import {useNavigate} from "react-router";
import {deleteNotesRequest} from "../../../lib/data/deleteNotesRequest.ts";

export const Dashboard = () => {
    const navigate = useNavigate();

    const context = useContext(NotesContext)

    if (!context) {
        throw new Error("NotesContext must be used within a NotesProvider");
    }

    const deleteNote = async (id: number) => {
        context.setNotes(context.notes.filter(note => note.id !== id));
        await deleteNotesRequest(id.toString())
    };

    const handleLogout = () => {
        destroySession()
        navigate('/auth/login');
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col bg-white shadow-lg mb-8 py-4">
                <div className={"max-w-7xl mx-auto w-full flex justify-between items-center"}>
                    <a href={"#"} className={"font-extrabold text-4xl"}>Notes</a>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="ghost" size={"3"}>
                                joe@doe.com
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>Perfil</DropdownMenu.Item>
                            <DropdownMenu.Item color={"red"} onClick={handleLogout}>Sair</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            </div>

            {context.notes.length <= 0 && <PanelEmptyNotes/>}

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Painel de Notas</h2>
                    <ButtonDialogCreateNote> Criar Nota </ButtonDialogCreateNote>
                </div>
                <div className="space-y-4">
                    {context.notes.map(note => (
                        <Note key={note.id} title={note.title} content={note.content} onClick={() => deleteNote(note.id)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
