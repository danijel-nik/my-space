import { FC, ReactNode } from 'react'
import { useTheme } from 'lib-client/providers/ThemeProvider'
import Header from 'components/Header'
import Navigation from 'components/Navigation/Navigation'
import BgSquares from 'components/global/BgSquares'

type Props = {
    children: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
    const { currentTheme } = useTheme()

    return (
        <div className={currentTheme === 'dark' ? 'dark' : ''}>
            <div className="bg-gray-100 antialiased dark:bg-zinc-900 dark:text-white overflow-x-hidden transition-colors">
                <Header />
                <Navigation />
                <div className="pt-[70px] lg:ml-[230px] max-w-[100%] px-[20px] pb-[20px] min-h-screen relative">
                    <BgSquares />
                    <div className="relative z-[1]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppLayout