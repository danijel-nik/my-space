import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter()
    const { pathname } = router
    
    return (
        <div className="fixed top-0 left-0 right-0 py-3 bg-gray-900 text-white">
            <div className="flex items-center justify-between w-[100%] max-w-[1200px] px-[20px] mx-auto">
                <h2 className="font-bold text-2xl">
                    <Link href="/" shallow>Notes</Link>
                </h2>
                <nav>
                    <ul className="list-none flex font-semibold">
                        <li className={`mr-5 hover:text-blue-400 transition-colors ${pathname === '/' ? 'text-blue-400' : ''}`}>
                            <Link href="/" shallow>My Notes</Link>
                        </li>
                        <li className={`hover:text-blue-400 transition-colors ${pathname === '/note-categories' ? 'text-blue-400' : ''}`}>
                            <Link href="/note-categories" shallow>Note Categories</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header