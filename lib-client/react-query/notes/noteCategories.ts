import { useQuery } from 'react-query'
import axios from 'lib-client/axios'
import { Routes } from 'lib-client/constants'

const getNoteCategories = async (includeNotes?: boolean) => {
    const { data } = includeNotes
     ? await axios.get(`${Routes.API.NOTE_CATEGORIES}?include_notes=${includeNotes}`)
     : await axios.get(`${Routes.API.NOTE_CATEGORIES}`)
    return data
}

export const useNoteCategories = (includeNotes?: boolean) => {
    const query = useQuery(['get-note-categories', includeNotes], () => getNoteCategories(includeNotes))
    return query
}