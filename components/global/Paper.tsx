import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    ec: string // extra classes
}

const Paper = ({ children, ec }: Props) => {
    return (
        <div className={`p-4 rounded shadow-lg dark:shadow-zinc-700/50 dark:shadow-md bg-white dark:bg-zinc-800 transition-all ${ec}`}>
            {children}
        </div>
    )
}

Paper.defaultProps = {
    ec: ''
}

export default Paper