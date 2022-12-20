import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter()
    const { pathname } = router

    return (
        <div className="fixed top-0 left-0 lg:left-[230px] right-0 py-3 backdrop-blur-sm bg-white/50 text-zinc-900 dark:bg-zinc-900/50 dark:text-white border-b border-zinc-900/10 dark:border-white/10 z-[9999]">
            <div className="flex items-center justify-between w-[100%] px-[20px]">
                <div></div>
                <h2 className="font-bold text-xl lg:hidden">
                    <Link href="/" shallow>Notes & Stuff</Link>
                </h2>
                <nav>
                    <ul className="list-none flex font-semibold">
                        <li className={`hover:text-blue-400 transition-colors ${pathname === '/note-categories' ? 'text-blue-400' : ''}`}>
                            <Link href="#" shallow>Username</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header