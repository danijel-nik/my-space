import { useState, useRef, ReactNode } from 'react'
import { createPopper } from "@popperjs/core"

interface Props {
    children: ReactNode
    title?: string
    text: string
}

const Tooltip = ({ children, title, text }: Props) => {
    const [tooltipShow, setTooltipShow] = useState(false)
    const elRef = useRef<any>()
    const tooltipRef = useRef<any>()
    const openLeftTooltip = () => {
        createPopper(elRef.current, tooltipRef.current, {
            placement: "bottom",
            strategy: "fixed"
        })
        setTooltipShow(true)
    };
    const closeLeftTooltip = () => {
        setTooltipShow(false)
    }
    return (
        <>
            <div
                className="inline-block"
                onMouseEnter={openLeftTooltip}
                onMouseLeave={closeLeftTooltip}
                ref={elRef}
            >
                {children}
            </div>
            <div
                className={
                    (tooltipShow ? "" : "hidden ") +
                    "bg-black border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                }
                ref={tooltipRef}
            >
                <div>
                    {(title && title !== '') ? (
                        <div
                            className={
                                "bg-black text-white opacity-75 font-semibold p-2 mb-0 border-b border-solid border-slate-100 uppercase rounded-t-lg"
                            }
                        >
                            {title}
                        </div>
                    ) : null}

                    <div className="text-white p-2">
                        {text}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tooltip