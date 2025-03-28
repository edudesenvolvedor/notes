import {MouseEventHandler} from "react";

interface Note {
    id?: number;
    title: string;
    content: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Note = ({title, content, onClick}: Note) => {
    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{content}</p>
            <button
                onClick={onClick}
                className="mt-2 text-red-600 hover:underline"
            >
                Excluir
            </button>
        </div>
    )
}