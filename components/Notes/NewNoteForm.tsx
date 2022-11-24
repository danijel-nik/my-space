import { useState, Dispatch, SetStateAction } from 'react'
import { Note, NoteCategory } from 'types'
import { useRouter } from 'next/router'
import Button from 'components/global/Button'
import Modal from 'components/global/Modal'
import { useCreateNote } from 'lib-client/react-query/notes'

export interface Props {
    categories: NoteCategory[]
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const NewNoteForm = ({ categories, open, setOpen }: Props) => {
    const [form, setForm] = useState<Note>({
        id: '',
        title: '',
        content: '',
        categoryID: ''
    })

    const { mutate: createNote } = useCreateNote()

    const handleSubmit = async (data: Note) => {
        try {
            await createNote(data);
            setForm({ id: '', title: '', content: '', categoryID: '' })
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title="New Note"
            btnCancel={true}
            actions={
                <Button color="success" onClick={() => handleSubmit(form)}>
                    Add +
                </Button>
            }
        >
            <div
                className="w-[100%] space-y-6 flex flex-col items-stretch"
            >
                <select
                    className="border-2 rounded border-gray-600 p-1 cursor-pointer"
                    onChange={e => setForm({ ...form, categoryID: e.target.value })}
                    value={form.categoryID}
                >
                    <option value="">Select category</option>
                    {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="border-2 rounded border-gray-600 p-1"
                />

                <textarea
                    placeholder="Content"
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    className="border-2 rounded border-gray-600 p-1"
                    rows={10}
                ></textarea>
            </div>
        </Modal>
    )
}

export default NewNoteForm