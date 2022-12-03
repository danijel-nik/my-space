import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Button from 'components/global/Button'
import { useEditNote } from 'lib-client/react-query/notes'

interface Props {
    id: string
    title: string
    content: string
    categoryID: string
    refreshData: () => void
    setEditForm: Dispatch<SetStateAction<boolean>>
}

const EditNoteForm = ({ id, title, content, categoryID, refreshData, setEditForm }: Props) => {

    const [formTitle, setFormTitle] = useState<string>('')
    const [formContent, setFormContent] = useState<string>('')
    const { mutate: editNote, isSuccess: isEditSuccess } = useEditNote()

    useEffect(() => {
        setFormTitle(title)
        setFormContent(content)

        return () => {
            setFormTitle('')
            setFormContent('')
        }
    }, [title, content])

    useEffect(() => {
        if (isEditSuccess) {
            refreshData()
            setEditForm(false)
        }
    }, [isEditSuccess])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        let formData = {
            id,
            title: formTitle,
            content: formContent,
            categoryID
        }
        editNote(formData)
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
                <Button
                    className="flex-grow"
                    type="submit"
                >
                    Edit
                </Button>
                <Button
                    className="flex-grow"
                    onClick={() => setEditForm(false)}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default EditNoteForm