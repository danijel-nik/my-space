import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { format } from 'path'
import styles from '../styles/Home.module.css'

interface FormData {
	id: string
	title: string
	content: string
}

const Home: NextPage = () => {
	const [form, setForm] = useState<FormData>({
		id: '',
		title: '',
		content: ''
	})
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold text-center mb-4">
				Notes
			</h1>
			<form
				className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
				onSubmit={e => {
					e.preventDefault()
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
		</div>
	)
}

export default Home
