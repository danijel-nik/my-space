import { MouseEvent, useEffect, useState } from 'react'

interface Props {
    type?: 'button' | 'submit' | 'reset' | undefined
    size?: 'small' | 'regular' | 'large'
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => any | void
    children: string
}

const Button = ({ type, size, className, onClick, children }: Props) => {

    const [sizeClass, setSizeClass] = useState<string>();

    useEffect(() => {
        switch (size) {
            case 'small': setSizeClass('text-xs px-4 py-2')
            break;

            case 'large': setSizeClass('text-base px-8 py-3')
            break;

            default:
                setSizeClass('text-sm px-6 py-3')
        }
    }, [size])

    return (
    <button
        type={type ?? 'button'} 
        className={`bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 font-bold uppercase ${sizeClass} rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${className ?? ''}`}
        onClick={onClick}
    >
        {children}
    </button>
)}

Button.defaultProps = {
    size: 'regular'
}

export default Button