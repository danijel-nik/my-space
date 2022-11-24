export const Routes = {
	SITE: {
		HOME: '/',
		NOTES: '/notes/',
		NOTE_CATEGORIES: '/notes/categories/'
	},
	API: {
		NOTES: '/api/notes',
		NOTE_CREATION: '/api/notes/create',
		NOTE_CATEGORIES: '/api/notes/categories',
		NOTE_CATEGORIES_CREATION: '/api/notes/categories/create'
	}
} as const