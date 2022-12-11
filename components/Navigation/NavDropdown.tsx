import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
    title: string
    items: {
        title: string
        link: string
    }[]
}

const NavDropdown = ({ title, items }: Props) => {
    const router = useRouter()
    const { pathname } = router

    const [open, setOpen] = useState(false)

    useEffect(() => {
        let isCurrentPathArr = items.map((item) => item.link === pathname)

        if (isCurrentPathArr.includes(true)) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [pathname])

    return (
        <ul>
            <li
                className="cursor-pointer px-[20px] py-1 font-semibold"
                onClick={() => setOpen(!open)}
            ><Link href={items[0].link}>{title}</Link></li>
            {items?.length > 0 && open && (
                <ul className="ml-[21px] px-[16px] pt-5 border-l-2">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`mb-2 hover:text-blue-400 transition-colors ${pathname === item.link ? 'text-blue-400' : ''}`}
                        >
                            <Link href={item.link}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </ul>
    )
}

export default NavDropdown