import { FC, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeSwitcher from './global/ThemeSwitcher'
import { IoIosClose } from 'react-icons/io'
import { FiMenu } from 'react-icons/fi'

type Props = {
    mobileNavOpen: boolean
    setMobileNavOpen: Dispatch<SetStateAction<boolean>>
}

const Header: FC<Props> = ({ mobileNavOpen, setMobileNavOpen }) => {

    const router = useRouter()
    const { pathname } = router

    return (
        <div className={`fixed top-0 left-0 lg:left-[230px] right-0 py-3 backdrop-blur-sm bg-white${mobileNavOpen ? '' : '/50'} lg:bg-white/50 text-zinc-900 dark:bg-zinc-900${mobileNavOpen ? '' : '/50'} lg:dark:bg-zinc-900/50 dark:text-white border-b border-zinc-900/10 dark:border-white/10 z-[2]`}>
            <div className="flex items-center justify-between w-[100%] px-[20px]">
                <div>
                    {(!mobileNavOpen)
                        ? <FiMenu className="lg:hidden cursor-pointer w-[22px] h-[24px]" onClick={() => setMobileNavOpen(true)} />
                        : <IoIosClose className="lg:hidden cursor-pointer w-[34px] h-[34px] m-[-6px]" onClick={() => setMobileNavOpen(false)} />
                    }
                </div>
                <h2 className="font-bold text-xl lg:hidden select-none">
                    <Link href="/" shallow>Notes & Stuff</Link>
                </h2>
                <nav>
                    <ul className="list-none flex font-semibold items-center gap-2">
                        <li>
                            <ThemeSwitcher />
                        </li>
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