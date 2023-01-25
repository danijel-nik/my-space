import { useState } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ThemeProvider from 'lib-client/providers/ThemeProvider'
import { SessionProvider } from "next-auth/react";
import AppLayout from 'components/global/AppLayout'
import AuthChecker from 'components/global/AuthChecker'

function MyApp({ Component, pageProps: { dehydratedState, session, ...pageProps } }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={dehydratedState}>
					<ThemeProvider>
						<SessionProvider session={session}>
							<AuthChecker>
								<AppLayout>
									<Component {...pageProps} />
								</AppLayout>
							</AuthChecker>
						</SessionProvider>
					</ThemeProvider>
				</Hydrate>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}

export default MyApp
