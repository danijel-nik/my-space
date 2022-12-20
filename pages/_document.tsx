import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="">
      <Head />
      <body className="bg-gray-100 antialiased dark:bg-zinc-900 overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}