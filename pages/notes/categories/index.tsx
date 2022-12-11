import { useRouter } from 'next/router'
import NoteCategoriesView from 'views/NoteCategoriesView'

const NoteCategories = () => {
	const router = useRouter()

	return (
		<>
			<NoteCategoriesView />
		</>
	)
}

export default NoteCategories