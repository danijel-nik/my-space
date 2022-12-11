import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    ec: string // extra classes
}

const Paper = ({ children, ec }: Props) => {
    return (
        <div className={`p-4 rounded shadow-lg bg-white transition-all ${ec}`}>
            {children}
        </div>
    )
}

Paper.defaultProps = {
    ec: ''
}

export default Paper