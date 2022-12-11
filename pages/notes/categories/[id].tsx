import { useRouter } from 'next/router'

const NoteCategory = () => {
	const { query } = useRouter()

	return (
		<>
			<h1 className="text-2xl font-bold mb-8">Note category {query.id}</h1>
		</>
	)
}

export default NoteCategory