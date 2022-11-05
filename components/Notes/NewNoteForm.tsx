import { useState, Dispatch, SetStateAction } from 'react'
import { Note, NoteCategory } from 'types'
import { useRouter } from 'next/router'
import Button from 'components/global/Button'
import Modal from 'components/global/Modal'

export interface Props {
    categories: NoteCategory[]
    refreshData: () => void
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const NewNoteForm = ({ categories, refreshData, open, setOpen }: Props) => {
    const [form, setForm] = useState<Note>({
        id: '',
        title: '',
        content: '',
        categoryID: ''
    })

    const createNote = async (data: Note) => {
        try {
            fetch('/api/notes/create', {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then((resp) => {
                if (resp.status === 200) {
                    setForm({ id: '', title: '', content: '', categoryID: '' })
                    setOpen(false)
                    refreshData()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (data: Note) => {
        try {
            createNote(data);
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