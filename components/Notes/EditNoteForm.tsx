import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Button from 'components/global/Button'
import { useEditNote } from 'lib-client/react-query/notes'
import Modal from 'components/global/Modal'

interface Props {
    id: string
    title: string
    content: string
    categoryID: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const EditNoteForm = ({ id, title, content, categoryID, open, setOpen }: Props) => {

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
    }, [title, content, open])

    useEffect(() => {
        if (isEditSuccess) {
            setOpen(false)
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
        <Modal
            open={open}
            setOpen={setOpen}
            title={`Edit Note: ${title}`}
            btnCancel={true}
            actions={
                <>
                    <Button color="success" onClick={handleSubmit}>
                        Edit
                    </Button>
                </>
            }
        >
            <form className="w-auto mx-auto space-y-6 flex flex-col items-stretch mb-20">
                <input
                    type="text"
                    placeholder="Title"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1"
                />

                <textarea
                    placeholder="Title"
                    value={formContent}
                    onChange={e => setFormContent(e.target.value)}
                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1"
                    rows={10}
                ></textarea>
            </form>
        </Modal>
    );
}

export default EditNoteForm