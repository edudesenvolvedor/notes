import {useCallback, useContext, useState} from "react";
import {Note, NotesContext} from "../contexts/NotesContext.tsx";
import {Button, Dialog, Flex, Text, TextArea, TextField} from "@radix-ui/themes";
import {createNotesRequest} from "../lib/data/createNotesRequest.ts";
import {getListNotesRequest} from "../lib/data/getListNotesRequest.ts";

type ButtonDialogCreateNoteProps = {
    children: string;
    size?: string;
}

export const ButtonDialogCreateNote = ({ children }: ButtonDialogCreateNoteProps) => {
    const context = useContext(NotesContext);

    if (!context) {
        throw new Error("NotesContext must be used within a NotesProvider");
    }

    const createNote = async (title: string, content: string) => {
        try {
            await createNotesRequest(title, content);
        } catch (error) {
            console.error("Erro ao criar nota:", error);
        }
    };

    const updateNotes = async () => {
        try {
            const notes = await getListNotesRequest();
            context.setNotes(notes as Note[]);
        } catch (error) {
            console.error("Erro ao atualizar notas:", error);
        }
    };

    const [newNote, setNewNote] = useState({ title: "", content: "" });

    const addNote = useCallback(async () => {
        if (!newNote.title || !newNote.content) return;

        const noteToAdd = { id: Date.now(), ...newNote };

        context.setNotes(prevNotes => [...prevNotes, noteToAdd]);

        setNewNote({ title: "", content: "" });

        try {
            await createNote(newNote.title, newNote.content);
            await updateNotes();
        } catch (error) {
            console.error("Erro ao adicionar nota:", error);
        }
    }, [newNote, context]);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="4">{children}</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Criar Nota</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Crie suas notas, guarde lembranças e mais ...
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Titulo
                        </Text>
                        <TextField.Root
                            placeholder="Titulo da sua nota..."
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Conteúdo
                        </Text>
                        <TextArea
                            placeholder="Digite a sua mensagem que queres guarda..."
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        />

                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancelar
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={addNote}>Criar</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    )
}