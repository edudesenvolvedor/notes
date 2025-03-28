import {ButtonDialogCreateNote} from "./ButtonDialogCreateNote.tsx";

export const PanelEmptyNotes = () => {
    return (
        <>
            <div className="max-h-screen h-dvh flex justify-between items-center">
                <div className={"flex flex-col justify-center items-center w-full space-y-6"}>
                    <h2 className={"text-4xl"}>Ainda não Possuí Nota</h2>
                    <ButtonDialogCreateNote size="3">Criar Primeira Nota</ButtonDialogCreateNote>
                </div>
            </div>
        </>
    )
}
