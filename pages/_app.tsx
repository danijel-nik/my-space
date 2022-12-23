import { useState } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import BgSquares from 'components/global/BgSquares'
import Header from 'components/Header'
import Navigation from 'components/Navigation/Navigation'

function MyApp({ Component, pageProps: { dehydratedState, ...pageProps } }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={dehydratedState}>
					<Header />
					<Navigation />
					<div className="pt-[70px] lg:ml-[230px] max-w-[100%] px-[20px] pb-[20px] min-h-screen relative">
						<BgSquares />
						<Component {...pageProps} />
					</div>
				</Hydrate>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}

export default MyApp
