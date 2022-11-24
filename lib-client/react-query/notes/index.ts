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