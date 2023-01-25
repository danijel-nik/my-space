export interface UserRegistration {
    name: string
    email: string
    password: string
}

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


export interface NoteWithCategories extends Note {
    categories?: NoteCategory[]
}