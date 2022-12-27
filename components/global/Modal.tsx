import { ReactNode, Dispatch, SetStateAction } from 'react'

interface Props {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	title: string
	children: ReactNode
	btnCancel: boolean
	actions?: ReactNode
}

const Modal = ({ open, setOpen, title, children, btnCancel, actions }: Props) => {
	return (

		open ? (
			<>
				<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none backdrop-blur-sm">
					<div className="absolute inset-0" onClick={() => setOpen(false)}></div>
					<div className="relative w-[100%] my-6 mx-auto max-w-4xl">
						{/*content*/}
						<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-zinc-800 outline-none focus:outline-none">
							{/*header*/}
							<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
								<h3 className="text-3xl font-semibold">
									{title}
								</h3>
								<button
									className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
									onClick={() => setOpen(false)}
								>
									<span className="bg-transparent text-black dark:text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
										&times;
									</span>
								</button>
							</div>
							{/*body*/}
							<div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
								<div className="my-4 text-slate-500 dark:text-white text-lg leading-relaxed">
									{children}
								</div>
							</div>
							{/*footer*/}
							{(btnCancel || actions) && (
								<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
									{btnCancel && <button
										className="text-neutral-500 dark:text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setOpen(false)}
									>
										Cancel
									</button>}
									{actions || null}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
			</>
		) : null
	)
}

Modal.defaultProps = {
	btnCancel: false
}

export default Modal