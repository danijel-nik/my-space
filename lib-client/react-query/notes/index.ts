import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'lib-client/axios'
import { Routes } from 'lib-client/constants'
import { Note } from 'types'

// List
const getNotes = async () => {
    const { data } = await axios.get(Routes.API.NOTES)
    return data
}

export const useNotes = () => {
    const query = useQuery(['get-notes'], () => getNotes())
    return query
}

// Creation
const createNote = async (note: Note) => {
    const { data } = await axios.post(Routes.API.NOTE_CREATION, note)
}

export const useCreateNote = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation((note: Note) => createNote(note), {
        onSuccess: async () => {
            queryClient.invalidateQueries(['get-notes'])
        }
    })
    return mutation
}

// Edit
const editNote = async (note: Note) => {
    const { data } = await axios.put(`${Routes.API.NOTES}/${note.id}`, note)
    return data
}

export const useEditNote = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation((note: Note) => editNote(note), {
        onSuccess: async () => {
            queryClient.invalidateQueries(['get-notes'])
        }
    })
    return mutation
}

// Delete
const deleteNote = async (id: string) => {
    const { data } = await axios.delete(`${Routes.API.NOTES}/${id}`)
    return data
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation((noteId: string) => deleteNote(noteId), {
        onSuccess: async () => {
            queryClient.invalidateQueries(['get-notes'])
        }
    })
    return mutation
}