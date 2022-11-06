import { useState } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
					<div className="pt-[70px] pl-[250px] w-[100%] pr-[20px] pb-[20px]">
						<Component {...pageProps} />
					</div>
				</Hydrate>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}

export default MyApp
