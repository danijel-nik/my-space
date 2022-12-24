import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react'

type ContextProps = {
    currentTheme: string
    changeTheme?: (theme: string) => void
}

const initialState: ContextProps = {
    currentTheme: ''
}

const ThemeContext = createContext(initialState)
export const useTheme = () => useContext(ThemeContext)

type Props = {
    children: ReactNode
}

const ThemeProvider: FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState<ContextProps>(initialState)

    // use localStorage in useEffect to make sure that it was called on client side
    useEffect(() => {
        let themeLS = localStorage.getItem('theme') || ''
        setTheme({ ...theme, currentTheme: themeLS })
    }, [])

    const changeTheme = (theme: string) => {
        setTheme({ currentTheme: theme })
        localStorage.setItem('theme', theme)
    }

    return (
        <ThemeContext.Provider value={{
            currentTheme: theme.currentTheme,
            changeTheme: changeTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider