import { useState, useEffect, Dispatch, SetStateAction } from 'react'

interface Props {
    id: string
    title: string
    content: string
    refreshData: () => void
    setEditForm: Dispatch<SetStateAction<boolean>>
}

const EditNoteForm = ({ id, title, content, refreshData, setEditForm }: Props) => {

    const [formTitle, setFormTitle] = useState<string>('')
    const [formContent, setFormContent] = useState<string>('')

    useEffect(() => {
        setFormTitle(title)
        setFormContent(content)

        return () => {
            setFormTitle('')
            setFormContent('')
        }
    }, [title, content])

    const editNote = (noteId: string) => {
        try {
            fetch(`/api/notes/${noteId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    title: formTitle,
                    content: formContent
                })
            }).then(() => {
                refreshData()
                setEditForm(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        editNote(id)
    }
    return (
        <form
            className="w-auto mx-auto space-y-6 flex flex-col items-stretch mb-20"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Title"
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                className="border-2 rounded border-gray-600 p-1"
            />

            <textarea
                placeholder="Title"
                value={formContent}
                onChange={e => setFormContent(e.target.value)}
                className="border-2 rounded border-gray-600 p-1"
            ></textarea>

            <div className="flex flex-row gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded p-1 flex-grow">
                    Edit
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded p-1 flex-grow">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EditNoteForm