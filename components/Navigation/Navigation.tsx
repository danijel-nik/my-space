import { FC, Dispatch, SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NavDropdown from './NavDropdown'

type Props = {
    mobileNavOpen: boolean
    setMobileNavOpen: Dispatch<SetStateAction<boolean>>
}

const Navigation: FC<Props> = ({ mobileNavOpen, setMobileNavOpen }) => {

    const navigation = [
        {
            title: 'Dashboard',
            link: '/'
        },
        {
            type: 'dropdown',
            title: 'My Notes',
            items: [
                {
                    title: 'Notes',
                    link: '/notes'
                },
                {
                    title: 'Note Categories',
                    link: '/notes/categories'
                }
            ]
        }
    ]

    const { pathname } = useRouter()

    useEffect(() => {
        setMobileNavOpen(false)
    }, [pathname])

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 top-[54px] ${mobileNavOpen ? 'block' : 'hidden'} lg:hidden bg-zinc-400/20 backdrop-blur-sm dark:bg-black/40 opacity-100 z-[100]`}
                onClick={() => setMobileNavOpen(false)}
            ></div>
            {/* Navigation */}
            <ul className={`fixed top-[54px] lg:top-0 bottom-0 ${mobileNavOpen ? 'left-0' : '-left-[250px]'} lg:left-0 w-[230px] py-3 overflow-y-auto transition-all z-[9998] lg:z-[1] border-r border-zinc-900/10 text-zinc-900 bg-white lg:bg-transparent dark:text-white dark:border-white/10 dark:bg-zinc-900  lg:dark:bg-transparent`}>
                <h2 className="font-bold text-xl px-[20px] mb-10 hidden lg:block select-none">
                    <Link href="/" shallow>Notes & Stuff</Link>
                </h2>
                {navigation.map((navItem, index) => (
                    navItem.type === 'dropdown' ? (
                        <NavDropdown key={index} title={navItem.title} items={navItem.items} />
                    ) : (
                        <li key={index} className={`px-[20px] py-1 font-semibold ${pathname === navItem.link ? 'text-blue-400' : ''}`}>
                            <Link
                                href={navItem.link || ''}
                            >
                                {navItem.title}
                            </Link>
                        </li>
                    )
                ))}
            </ul>
        </>
    )
}

export default Navigation