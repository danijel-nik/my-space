import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<div className="pt-[70px] w-[100%] max-w-[1200px] px-[20px] mx-auto mb-[20px]">
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
