import { useState } from 'react'
import EditNoteForm from './EditNoteForm'
import { NoteWithCategories } from 'types';
import { useDeleteNote } from 'lib-client/react-query/notes'
import Paper from 'components/global/Paper'
import Tooltip from 'components/global/Tooltip'
import Modal from 'components/global/Modal';
import Button from 'components/global/Button';
import { formatDate } from 'ustils'
import Link from 'next/link'
import { FaEdit, FaTimes } from 'react-icons/fa'

interface Props {
    note: NoteWithCategories
}

const NoteItem = ({ note }: Props) => {

    const [openEditForm, setOpenEditForm] = useState<boolean>(false)
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false)
    const { mutate: deleteNote } = useDeleteNote()

    return (
        <>
            <div className="w-full lg:w-6/12 xl:w-3/12 p-3">
                <Paper>
                    <div className="text-right">
                        <Tooltip text="Edit this note">
                            <span
                                className="text-gray-400 hover:text-gray-600 transition-colors px-1 mr-1 text-sm inline-block cursor-pointer"
                                onClick={() => setOpenEditForm(true)}
                            >
                                <FaEdit />
                            </span>
                        </Tooltip>
                        <Tooltip text="Delete this note">
                            <span
                                className="text-gray-400 hover:text-gray-600 transition-colors px-1 text-sm inline-block cursor-pointer"
                                onClick={() => setOpenDeleteConfirmation(true)}
                            >
                                <FaTimes />
                            </span>
                        </Tooltip>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex-1 pr-2 w-full">
                            <h3 className="font-bold">{note.title}</h3>
                            <p className="text-xs mb-3 text-gray-400">
                                Category:
                                {note.categories?.map((category) => (
                                    <span
                                        key={category.id}
                                        className="inline-block ml-2 font-bold"
                                    >
                                        <Link href={`/notes/categories/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </span>
                                ))}
                            </p>
                            <p className="text-sm mb-3 truncate">{note.content}</p>
                        </div>
                    </div>
                    <div className="text-xs text-right text-gray-400 font-bold">{formatDate(note?.updatedAt)}</div>
                </Paper>
            </div>
            <EditNoteForm id={note.id} title={note.title} content={note.content} categoryID={note.categoryID} open={openEditForm} setOpen={setOpenEditForm} />
            {/* Delete confirmation */}
            <Modal
            open={openDeleteConfirmation}
            setOpen={setOpenDeleteConfirmation}
            title="Confirmation"
            btnCancel={true}
            actions={
                <>
                    <Button color="error" onClick={() => deleteNote(note.id)}>
                        Delete
                    </Button>
                </>
            }
        >
            Are you sure you want to delete <strong>{note.title}</strong> note?
        </Modal>
        </>
)}

export default NoteItem