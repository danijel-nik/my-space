import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<string>()

    useEffect(() => {
        let themeLS = localStorage.getItem('theme')
        setTheme(themeLS ?? '')
    }, [])

    useEffect(() => {
        let htmlEl = document.getElementsByTagName('html')[0]
        if (theme === 'dark') {
            htmlEl.classList.add('dark')
        } else {
            htmlEl.classList.remove('dark')
        }
    }, [theme])

    const switchTheme = (theme: string) => {
        localStorage.setItem('theme', theme)
        setTheme(theme)
    }

    return (
        <div className="cursor-pointer">
            {
                theme === 'dark' ? (
                    <FiMoon onClick={() => switchTheme('')} />
                ) : (
                    <FiSun onClick={() => switchTheme('dark')} />
                )
            }
        </div>
    )
}

export default ThemeSwitcher