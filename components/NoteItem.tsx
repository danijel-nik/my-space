import { useState } from 'react'
import EditNoteForm from './EditNoteForm'

export interface Note {
    id: string
    title: string
    content: string
    createdAt?: string
    updatedAt?: string
}

interface Props {
    note: Note
    refreshData: () => void
}

const NoteItem = ({ note, refreshData }: Props) => {

    const [editForm, setEditForm] = useState<boolean>(false)


    const deleteNote = async (id: string) => {
        try {
            fetch(`/api/note/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }).then(() => refreshData())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <li className="border-b border-gray-600 p-2">
            <div className="flex justify-between">
                <div className="flex-1 pr-2">
                    {editForm ? <EditNoteForm id={note.id} title={note.title} content={note.content} refreshData={refreshData} setEditForm={setEditForm} /> : (
                        <>
                            <h3 className="font-bold">{note.title}</h3>
                            <p className="text-sm mb-1">{note.content}</p>
                        </>
                    )}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors px-1 mr-1 text-white rounded text-sm max-h-[20px]"
                    onClick={() => setEditForm(!editForm)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 transition-colors px-1 text-white rounded text-sm max-h-[20px]"
                    onClick={() => deleteNote(note.id)}
                >
                    &times;
                </button>
            </div>
            <div className="text-xs text-right text-gray-400 font-bold">{note.updatedAt?.split(" GMT")[0]}</div>
        </li>
    )
}

export default NoteItem