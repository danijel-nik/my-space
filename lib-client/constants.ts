export const Routes = {
	SITE: {
		HOME: '/',
		SIGNIN: '/login',
		SIGNUP: '/register',
		NOTES: '/notes/',
		NOTE_CATEGORIES: '/notes/categories/'
	},
	API: {
		NOTES: '/api/notes',
		NOTE_CREATION: '/api/notes/create',
		NOTE_CATEGORIES: '/api/notes/categories',
		NOTE_CATEGORIES_CREATION: '/api/notes/categories/create',
		USER_REGISTRATION: '/api/users/registration'
	}
} as const