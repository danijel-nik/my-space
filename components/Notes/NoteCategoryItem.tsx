import { useState } from 'react'
import Link from 'next/link'
import { Routes } from 'lib-client/constants'
import { NoteCategory } from 'types'
import {
    useUpdateCategory,
    useDeleteCategory
} from 'lib-client/react-query/notes/noteCategories'
import { FaEye, FaEdit, FaTimes } from 'react-icons/fa'
import Tooltip from 'components/global/Tooltip'
import Modal from 'components/global/Modal'
import Button from 'components/global/Button'

interface Props {
    noteCategory: NoteCategory
}

const NoteCategoryItem = ({ noteCategory }: Props) => {
    const { SITE } = Routes
    const [edit, setEdit] = useState<boolean>(false)
    const [changed, setChanged] = useState<boolean>(false)
    const [editCategoryName, setEditCategoryName] = useState<string>('')
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false)

    const { mutate: updateNoteCategory } = useUpdateCategory()
    const { mutate: deleteNoteCategory } = useDeleteCategory()

    return (
        <>
            <div
                key={noteCategory.id}
                className="w-[100%] max-w-xl flex justify-between gap-2 flex-wrap mx-auto mb-2 hover:bg-slate-300 p-1 transition-all items-center"
            >
                {edit ? (
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={editCategoryName}
                        onChange={e => setEditCategoryName(e.target.value)}
                        onKeyDown={() => setChanged(true)}
                        onBlur={() => {
                            if (changed) {
                                updateNoteCategory({ id: noteCategory.id, name: editCategoryName })
                            }
                            setEdit(false)
                        }}
                        className="border-2 rounded border-gray-600 p-1"
                    />
                ) : (
                    <div className="font-semibold">
                        <Link href={`${SITE.NOTE_CATEGORIES}${noteCategory.id}`}>{noteCategory.name}</Link>
                    </div>
                )}
                <div>
                    <Tooltip text="Edit category">
                        <span
                            className="text-gray-400 hover:text-gray-600 transition-colors px-1 mr-1 text-sm inline-block cursor-pointer"
                            onClick={() => {
                                setEdit(!edit)
                                setEditCategoryName(noteCategory.name)
                            }}
                        >
                            <FaEdit />
                        </span>
                    </Tooltip>
                    <Tooltip text="Delete category">
                        <span
                            className="text-gray-400 hover:text-gray-600 transition-colors px-1 mr-1 text-sm inline-block cursor-pointer"
                            onClick={() => setOpenDeleteConfirmation(true)}
                        >
                            <FaTimes />
                        </span>
                    </Tooltip>
                </div>
            </div>

            {/* Delete confirmation */}
            <Modal
                open={openDeleteConfirmation}
                setOpen={setOpenDeleteConfirmation}
                title="Confirmation"
                btnCancel={true}
                actions={
                    <>
                        <Button color="error" onClick={() => deleteNoteCategory(noteCategory.id)}>
                            Delete
                        </Button>
                    </>
                }
            >
                Are you sure you want to delete <strong>{noteCategory.name}</strong> category?
            </Modal>
        </>
    )
}

export default NoteCategoryItem