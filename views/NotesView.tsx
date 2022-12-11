import { useState } from 'react'
import Button from 'components/global/Button'
import NewNoteForm from 'components/Notes/NewNoteForm'
import NoteItem from 'components/Notes/NoteItem'
import { Note, NoteCategory } from 'types'
import { useNotes } from 'lib-client/react-query/notes'
import { useNoteCategories } from 'lib-client/react-query/notes/noteCategories'

const NotesView = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const noteQuery = useNotes()
    const noteCategoriesQuery = useNoteCategories(false)

    return (
        <>
            <div className="flex justify-between mb-8">
                <h1 className="text-2xl font-bold">
                    Notes
                </h1>
                <Button onClick={() => setModalOpen(true)}>Create New Note</Button>
            </div>

            <NewNoteForm categories={noteCategoriesQuery.data?.categories} open={modalOpen} setOpen={setModalOpen} />

            <div className="w-auto flex flex-wrap align-top">
                {noteQuery.data?.notes.map((note: Note) => (
                    <NoteItem key={note.id} note={note} />
                ))}
            </div>
        </>
    )
}

export default NotesView