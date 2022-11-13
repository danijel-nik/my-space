import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'lib-client/axios'
import { Routes } from 'lib-client/constants'
import { NoteCategory } from 'types'

// LIST
const getNoteCategories = async (includeNotes?: boolean) => {
    const { data } = includeNotes
     ? await axios.get(`${Routes.API.NOTE_CATEGORIES}?include_notes=${includeNotes}`)
     : await axios.get(Routes.API.NOTE_CATEGORIES)
    return data
}

export const useNoteCategories = (includeNotes?: boolean) => {
    const query = useQuery(['get-note-categories', includeNotes], () => getNoteCategories(includeNotes))
    return query
}

// CREATE
const createCategory = async (noteCategory: { name: string }) => {
    try {
        const { data } = await axios.post(Routes.API.NOTE_CATEGORIES_CREATION, noteCategory)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const useCreateNoteCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation(
        (noteCategory: { name: string }) => createCategory(noteCategory), {
            onSuccess: async () => {
                queryClient.invalidateQueries(['get-note-categories'])
            } 
        }
    )
    return mutation
}

// UPDATE
const updateCategory = async (noteCategory: NoteCategory) => {
    const {id, name} = noteCategory
    try {
        const { data } = await axios.put(`${Routes.API.NOTE_CATEGORIES}/${id}`, { name })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation(
        (noteCategory: NoteCategory) => updateCategory(noteCategory), {
            onSuccess: async () => {
                queryClient.invalidateQueries(['get-note-categories'])
            } 
        }
    )
    return mutation
}

// DELETE
const deleteCategory = async (catID: string) => {
    try {
        const { data } = await axios.delete(`${Routes.API.NOTE_CATEGORIES}/${catID}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation(
        (catID: string) => deleteCategory(catID), {
            onSuccess: async () => {
                queryClient.invalidateQueries(['get-note-categories'])
            } 
        }
    )
    return mutation
}