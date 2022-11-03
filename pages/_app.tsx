import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header'
import Navigation from 'components/Navigation/Navigation'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<Navigation />
			<div className="pt-[70px] pl-[250px] w-[100%] pr-[20px] pb-[20px]">
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
