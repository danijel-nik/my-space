import { useEffect, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type Props = {
    children: ReactNode
}

const AuthChecker = ({ children }: Props) => {
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        // Unauthenticated user on any page but Login or Register page redirection
        if ((session === null || session?.status !== "authenticated") && (router.pathname !== '/login' && router.pathname !== '/register')) {
            router.push('/login')
        }
    }, [])

    useEffect(() => {
        // Authenticated user on Login or Register page redirection
        if ((session !== null && session?.status === "authenticated") && (router.pathname === '/login' || router.pathname === '/register')) {
            router.push('/')
        }
    }, [session])

    if ((session !== null && session?.status === "authenticated") || (router.pathname === "/login" || router.pathname === '/register')) {
        return (
            <>{children}</>
        )
    }

    return (
        <></>
    )
}

export default AuthChecker