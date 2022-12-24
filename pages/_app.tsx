import { useState } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ThemeProvider from 'lib-client/providers/ThemeProvider'
import AppLayout from 'components/global/AppLayout'

function MyApp({ Component, pageProps: { dehydratedState, ...pageProps } }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={dehydratedState}>
					<ThemeProvider>
						<AppLayout>
							<Component {...pageProps} />
						</AppLayout>
					</ThemeProvider>
				</Hydrate>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}

export default MyApp
