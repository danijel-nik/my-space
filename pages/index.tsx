import { useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { prisma } from 'lib/prisma'
import NoteItem, { Note } from 'components/NoteItem';
import Head from 'next/head'
import Image from 'next/image'
import { format } from 'path'
import styles from '../styles/Home.module.css'

interface Notes {
	notes: Note[]
}

const Home: NextPage = ({ notes }: Notes) => {
	const [form, setForm] = useState<Note>({
		id: '',
		title: '',
		content: ''
	})
	const router = useRouter()

	const refreshData = () => {
		router.replace(router.asPath)
	}

	const createNote = async (data: Note) => {
		try {
			fetch('/api/create', {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}).then(() => {
				setForm({ id: '', title: '', content: '' })
				refreshData()
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = async (data: Note) => {
		try {
			createNote(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold text-center mb-4">
				Notes
			</h1>
			<form
				className="w-auto min-w-[100%] max-w-min mx-auto space-y-6 flex flex-col items-stretch mb-20 md:min-w-[50%] 2xl:min-w-[25%]"
				onSubmit={e => {
					e.preventDefault()
					handleSubmit(form)
				}}
			>
				<input
					type="text"
					placeholder="Title"
					value={form.title}
					onChange={e => setForm({ ...form, title: e.target.value })}
					className="border-2 rounded border-gray-600 p-1"
				/>

				<textarea
					placeholder="Title"
					value={form.content}
					onChange={e => setForm({ ...form, content: e.target.value })}
					className="border-2 rounded border-gray-600 p-1"
				></textarea>

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded p-1">
					Add +
				</button>
			</form>
			<div className="w-auto min-w-[100%] max-w-min mx-auto space-y-6 flex flex-col items-stretch mt-0 md:min-w-[50%] 2xl:min-w-[25%]">
				<ul>
					{notes.map(note => (
						<NoteItem key={note.id} note={note} refreshData={refreshData} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
	const notesData = await prisma.note.findMany({
		/*
		select: {
			id: true,
			title: true,
			content: true
		}
		*/
	})

	const notes = notesData.map(note => ({
		...note,
		createdAt: `${note.createdAt.toDateString()} ${note.createdAt.toTimeString()}`,
		updatedAt: `${note.updatedAt.toDateString()} ${note.updatedAt.toTimeString()}`
	}))

	return {
		props: {
			notes
		}
	}
}