import { MouseEvent, useEffect, useState } from 'react'

interface Props {
    type?: 'button' | 'submit' | 'reset' | undefined
    size?: 'small' | 'regular' | 'large'
    color?: 'primary' | 'success' | 'error'
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => any | void
    children: string
}

const Button = ({ type, size, color, className, onClick, children }: Props) => {

    const [sizeClass, setSizeClass] = useState<string>();
    const [colorClass, setColorClass] = useState<string>();

    useEffect(() => {
        switch (size) {
            case 'small': setSizeClass('text-xs px-4 py-2')
            break;

            case 'regular': setSizeClass('text-sm px-6 py-3')
            break;

            case 'large': setSizeClass('text-base px-8 py-3')
            break;

            default:
                setSizeClass('text-sm px-6 py-3')
        }
    }, [size])

    useEffect(() => {
        switch (color) {
            case 'primary': setColorClass('bg-sky-500 active:bg-sky-600')
            break;

            case 'success': setColorClass('bg-emerald-500 active:bg-emerald-600')
            break;

            case 'error': setColorClass('bg-red-500 active:bg-red-600')

            default:
                setColorClass('bg-sky-500 active:bg-sky-600')
        }
    }, [color])

    return (
    <button
        type={type ?? 'button'} 
        className={`${colorClass} text-white font-bold uppercase ${sizeClass} rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${className ?? ''}`}
        onClick={onClick}
    >
        {children}
    </button>
)}

Button.defaultProps = {
    size: 'regular',
    color: 'primary'
}

export default Button