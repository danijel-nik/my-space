import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NavDropdown from './NavDropdown'


const Navigation = () => {

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

    return (
        <ul className="fixed top-[56px] bottom-0 left-0 w-[230px] py-3 bg-gray-900 text-white overflow-y-auto">
            {navigation.map((navItem, index) => (
                navItem.type === 'dropdown' ? (
                    <NavDropdown key={index} title={navItem.title} items={navItem.items} />
                ) : (
                    <li key={index} className={`px-[20px] py-1 font-semibold ${pathname === navItem.link ? 'text-blue-400' : ''}`}>
                        <Link 
                            href={navItem.link}>
                            {navItem.title}
                        </Link>
                    </li>
                )
            ))}
        </ul>
    )
}

export default Navigation