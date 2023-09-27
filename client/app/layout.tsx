import { Navigation } from '@/components/Navigation/Navigation'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: 'Клиент',
  description: 'Клиентская часть приложения'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="default-layout">{children}</div>
        {/* <Navigation /> */}
      </body>
    </html>
  )
}
