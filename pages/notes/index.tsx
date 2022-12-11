import type { NextPage, GetServerSideProps, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { prisma } from 'lib-server/prisma'
import { Note, NoteCategory } from 'types'
import NotesView from 'views/NotesView'

export interface Props {
	notes?: Note[]
	categories?: NoteCategory[]
}

const Home = ({ }: Props) => {
	const router = useRouter()

	// use this if you are using getServerSideProps()
	const refreshData = () => {
		router.replace(router.asPath)
	}

	return (
		<>
			<NotesView />
		</>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
	const notesData = await prisma.note.findMany({
		include: {
			categories: true
		}
		/*
		select: {
			id: true,
			title: true,
			content: true
		}
		*/
	})
	const categoriesData = await prisma.noteCategory.findMany()

	const notes = notesData.map(note => ({
		...note,
		createdAt: `${note.createdAt.toDateString()} ${note.createdAt.toTimeString()}`,
		updatedAt: `${note.updatedAt.toDateString()} ${note.updatedAt.toTimeString()}`
	}))

	return {
		props: {
			notes,
			categories: categoriesData
		}
	}
}