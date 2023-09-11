// import { Navigation } from '@/components/Navigation/Navigation'
// import '../globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: 'Админ',
  description: 'Клиентская часть приложения'
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <div className="container mx-auto">{children}</div>
    </div>
    // <html lang="ru">
    //   <body className={inter.className}>
    //     <div className="container mx-auto">{children}</div>
    //     <Navigation />
    //   </body>
    // </html>
  )
}
