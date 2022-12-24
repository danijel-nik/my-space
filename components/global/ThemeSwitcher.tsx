import { FC } from 'react'
import { useTheme } from 'lib-client/providers/ThemeProvider'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeSwitcher: FC = () => {
    const { currentTheme, changeTheme } = useTheme()

    return (
        <div className="cursor-pointer">
            {
                currentTheme === 'dark' ? (
                    <FiMoon onClick={() => changeTheme?.('')} />
                ) : (
                    <FiSun onClick={() => changeTheme?.('dark')} />
                )
            }
        </div>
    )
}

export default ThemeSwitcher