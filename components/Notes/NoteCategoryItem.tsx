import { useState } from 'react'
import { NoteCategory } from 'types'
import {
    useUpdateCategory,
    useDeleteCategory
} from 'lib-client/react-query/notes/noteCategories'

interface Props {
    noteCategory: NoteCategory
}

const NoteCategoryItem = ({ noteCategory }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [changed, setChanged] = useState<boolean>(false)
    const [editCategoryName, setEditCategoryName] = useState<string>('')

    const { mutate: updateNoteCategory } = useUpdateCategory()
	const { mutate: deleteNoteCategory } = useDeleteCategory()

    return (
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
                            updateNoteCategory({ id: noteCategory.id, name: editCategoryName})
                        }
                        setEdit(false)
                    }}
                    className="border-2 rounded border-gray-600 p-1"
                />
            ) : (
                <div className="font-semibold">{noteCategory.name}</div>
            )}
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors p-1 mr-1 text-white rounded text-sm max-h-[20px]"
                    onClick={() => {
                        setEdit(!edit)
                        setEditCategoryName(noteCategory.name)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 transition-colors px-1 text-white rounded text-sm max-h-[20px]"
                    onClick={() => deleteNoteCategory(noteCategory.id)}
                >
                    &times;
                </button>
            </div>
        </div>
    )
}

export default NoteCategoryItem