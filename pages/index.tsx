import { useState } from 'react'
import type { NextPage, GetServerSideProps, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { prisma } from 'lib/prisma'
import NoteItem from 'components/Notes/NoteItem'
import { Note, NoteCategory } from 'types'
import Head from 'next/head'
import Image from 'next/image'
import { format } from 'path'
import styles from '../styles/Home.module.css'

export interface Props {
	notes: Note[]
	categories: NoteCategory[]
}

const Home = ({ notes, categories }: Props) => {
	const [form, setForm] = useState<Note>({
		id: '',
		title: '',
		content: '',
		categoryID: ''
	})
	const router = useRouter()

	const refreshData = () => {
		router.replace(router.asPath)
	}

	const createNote = async (data: Note) => {
		try {
			fetch('/api/notes/create', {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}).then(() => {
				setForm({ id: '', title: '', content: '', categoryID: '' })
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
		<>
			<h1 className="text-2xl font-bold text-center mb-4">
				Notes
			</h1>
			<form
				className="w-[100%] mx-auto space-y-6 flex flex-col items-stretch mb-20 md:w-[50%]"
				onSubmit={e => {
					e.preventDefault()
					handleSubmit(form)
				}}
			>
				<select
					className="border-2 rounded border-gray-600 p-1 cursor-pointer"
					onChange={e => setForm({ ...form, categoryID: e.target.value })}
					>
					<option value="">Select category</option>
					{categories?.map((cat) => (
						<option key={cat.id} value={cat.id}>{cat.name}</option>
					))}
				</select>
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
			<div className="w-auto mx-auto space-y-6 flex flex-col items-stretch mt-0 md:w-[50%]">
				<ul>
					{notes.map(note => (
						<NoteItem key={note.id} note={note} refreshData={refreshData} />
					))}
				</ul>
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