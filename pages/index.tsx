import { useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { prisma } from '../lib/prisma'
import Head from 'next/head'
import Image from 'next/image'
import { format } from 'path'
import styles from '../styles/Home.module.css'

interface Notes {
	notes: FormData[]
}

interface FormData {
	id: string
	title: string
	content: string
}

const Home: NextPage = ({ notes }: Notes) => {
	const [form, setForm] = useState<FormData>({
		id: '',
		title: '',
		content: ''
	})
	const router = useRouter()

	const refreshData = () => {
		router.replace(router.asPath)
	}

	const createNote = async (data: FormData) => {
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

	const deleteNote = async (id: string) => {
		try {
			fetch(`/api/note/${id}`, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'DELETE'
			}).then(() => refreshData())
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = async (data: FormData) => {
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
					className="bg-blue-500 text-white rounded p-1">
					Add +
				</button>
			</form>
			<div className="w-auto min-w-[100%] max-w-min mx-auto space-y-6 flex flex-col items-stretch mt-0 md:min-w-[50%] 2xl:min-w-[25%]">
				<ul>
					{notes.map(note => (
						<li key={note.id} className="border-b border-gray-600 p-2">
							<div className="flex justify-between">
								<div className="flex-1">
									<h3 className="font-bold">{note.title}</h3>
									<p className="text-sm">{note.content}</p>
								</div>
								<button
									className="bg-red-500 px-1 text-white rounded text-sm max-h-[20px]"
									onClick={() => deleteNote(note.id)}
								>
									&times;
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
	const notes = await prisma.note.findMany({
		select: {
			id: true,
			title: true,
			content: true
		}
	})

	return {
		props: {
			notes
		}
	}
}