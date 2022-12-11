import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NoteCategory } from 'types'
import Button from 'components/global/Button'
import {
    useNoteCategories,
    useCreateNoteCategory
} from 'lib-client/react-query/notes/noteCategories'
import NoteCategoryItem from 'components/Notes/NoteCategoryItem'

const NoteCategoriesView = () => {
    const [categoryName, setCategoryName] = useState<string>('')
    const { data, isLoading, isError } = useNoteCategories()
    const { mutate: createNoteCategory } = useCreateNoteCategory()

    const handleSubmit = async () => {
        createNoteCategory({ name: categoryName })
        setCategoryName('')
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                Note Categories
            </h1>
            <form
                className="w-[100%] max-w-xl mx-auto space-y-6 flex flex-col items-stretch mb-20"
                onSubmit={e => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    className="border-2 rounded border-gray-600 p-1"
                />

                <Button
                    type="submit"
                >
                    Add +
                </Button>
            </form>
            {data?.categories.map((item: NoteCategory) =>
                <NoteCategoryItem key={item.id} noteCategory={item} />
            )}
        </>
    )
}

export default NoteCategoriesView