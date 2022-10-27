export interface Note {
    id: string
    title: string
    content: string
    createdAt?: string
    updatedAt?: string
    categoryID: string
}

export interface NoteCategory {
    id: string
    name: string
}