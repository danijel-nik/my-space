import NextAuth, { Session } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib-server/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { userLoginSchema } from 'lib-server/validation'

const configuration = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: {
					label: 'Password',
					type: 'password',
				}
			},
			async authorize(credentials: any) {
				if (!credentials) throw new Error('undefined credentials');

				const result = userLoginSchema.safeParse(credentials)

				if (!result.success) {
					throw new Error("Email or password didn't match")
				}

				try {
					const user = await prisma.user.findFirst({
						where: {
							email: credentials.email
						}
					});

					if (user !== null) {
						// Compare the hash
						const res = await compare(credentials.password, user.password!)
						if (res === true) {
							return {
								id: user.id,
								name: user.name,
								email: user.email,
								role: user.role
							}
						} else {
							throw new Error("Hash not matched logging in")
						}
					} else {
						throw new Error("Email or password didn't match")
					}
				}
				catch (err) {
					throw new Error("Authorize error")
				}

			}
		}),
	],
	callbacks: {
		// both jwt and session are used to attach user to session
		// @ts-ignore
		async jwt({ token, user, account, isNewUser }) {
			// isNewUser = true only on user creation, can be used
			// to update db and session
			/*
			if (isNewUser && user && account) {
				const data = await updateUser(user, account);
				user = { ...user, ...data };
			}
			*/
			user && (token.user = user)
			return token
		},
		// @ts-ignore
		async session({ session, token }) {
			console.log(token)
			let _session: Session | undefined = undefined;
			const user = token.user
			// put just user's immutable props in session (id and email)
			// for session user use useUser React Query state
			if (user) {
				_session = {
					...session,
					accessToken: token.accessToken,
					user: { id: user.id, email: user.email, name: user.name, role: user.role }
				}
			}
			return _session as Session
		}
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXT_AUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/login'
	},
	debug: false
}
// @ts-ignore
export default (req, res) => NextAuth(req, res, configuration)