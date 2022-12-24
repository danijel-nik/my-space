import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-gray-100 antialiased dark:bg-zinc-900 dark:text-white overflow-x-hidden transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}