import { useState } from 'react'
import type { NextPage, GetServerSideProps, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { prisma } from 'lib-server/prisma'
import Loader from 'components/global/Loader'
import Button from 'components/global/Button'
import Modal from 'components/global/Modal'
import NewNoteForm from 'components/Notes/NewNoteForm'
import NoteItem from 'components/Notes/NoteItem'
import { Note, NoteCategory } from 'types'
import { useNotes } from 'lib-client/react-query/notes'
import { useNoteCategories } from 'lib-client/react-query/notes/noteCategories'
import { format } from 'path'

export interface Props {
	notes?: Note[]
	categories?: NoteCategory[]
}

const Home = ({ }: Props) => {
	const [modalOpen, setModalOpen] = useState(false)
	const router = useRouter()
	const noteQuery = useNotes()
	const noteCategoriesQuery = useNoteCategories(false)

	// use this if you are using getServerSideProps()
	const refreshData = () => {
		router.replace(router.asPath)
	}

	return (
		<>
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold mb-4">
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