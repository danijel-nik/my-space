import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NoteCategory } from 'types'
import Button from 'components/global/Button'
import { useNoteCategories } from 'lib-client/react-query/notes/noteCategories'


interface Props {
	noteCategories: NoteCategory[]
}

const NoteCategories = ({ noteCategories }: Props) => {
	const router = useRouter()
	const [categoryName, setCategoryName] = useState<string>('')
	const { data, isLoading, isError } = useNoteCategories()

	const refreshData = () => {
		router.replace(router.asPath)
	}

	const createCategory = async (data: { name: string }) => {
		try {
			fetch('/api/notes/categories/create', {
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

				<Button
					type="submit"
				>
					Add +
				</Button>
			</form>
			{data?.categories.map((item: NoteCategory) => <div key={item.id}>{item.name}</div>)}
		</>
	)
}

export default NoteCategories