import { useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage, GetServerSideProps, NextPageContext } from 'next'
import { NoteCategory } from 'types'


interface Props {
    noteCategories: NoteCategory[]
}

const NoteCategories = ({ noteCategories }: Props) => {
    const router = useRouter()
    const [categoryName, setCategoryName] = useState<string>('')

    const refreshData = () => {
		router.replace(router.asPath)
	}

    const createCategory = async (data: {name: string}) => {
        // console.log(data)
        // return
		try {
			fetch('/api/notes/category/create', {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}).then(() => {
				setCategoryName('')
				refreshData()
			})
		} catch (error) {
			console.log(error)
		}
	}
    
    const handleSubmit = async () => {
        try {
			createCategory({ name: categoryName })
		} catch (error) {
			console.log(error)
		}
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                Note Categories
            </h1>
            <form
				className="w-[100%] mx-auto space-y-6 flex flex-col items-stretch mb-20 md:w-[50%]"
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

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded p-1">
					Add +
				</button>
			</form>
        </>
    )
}

export default NoteCategories