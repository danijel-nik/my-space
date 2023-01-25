import { useState } from 'react'
import { useUserRegistration } from 'lib-client/react-query/users'
import { signIn } from 'next-auth/react'
import Paper from 'components/global/Paper'
import Button from 'components/global/Button'
import Link from 'next/link'


type Props = {
    type: 'login' | 'register'
}

const AuthView = ({ type }: Props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const { mutate: registerUser } = useUserRegistration()

    const handleRegistration = () => {
        registerUser({ name, email, password })
    }

    const handleLogin = async () => {
        await signIn('credentials', {
            email,
            password,
            redirect: false, // mutation with csrf token maybe
        })
    }

    return (
        <div className="flex items-center justify-center w-full h-[100vh] p-4">
            <div className="w-full max-w-2xl m-auto block">
                <h1 className="text-4xl mb-[10vh] text-center font-bold">Notes & Stuff</h1>
                <Paper>
                    {type === 'register' && (
                        <>
                            <h2 className="text-3xl mb-6 font-bold block">Registration</h2>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1 w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1 w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1 w-full"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    placeholder="Repeat Password"
                                    value={passwordConfirm}
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1 w-full"
                                />
                            </div>

                            <Button onClick={handleRegistration}>Register</Button>
                        </>
                    )}

                    {type === 'login' && (
                        <>
                            <h2 className="text-3xl mb-6 font-bold block">Login</h2>
                            <div className="mb-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1 w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="border-2 rounded border-gray-600 dark:bg-zinc-800 p-1 w-full"
                                />
                            </div>

                            <p className="mb-6">Don't have an account? Create one <Link className="underline" href="/register">here</Link> in second.</p>

                            <Button onClick={handleLogin}>Login</Button>
                        </>
                    )}
                </Paper>

            </div>
        </div>
    )
}

export default AuthView