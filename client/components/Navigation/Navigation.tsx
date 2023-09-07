import Link from 'next/link'

const Navigation = () => {
  return (
    <div className=" fixed bottom-6 right-6 rounded-2xl py-2 px-3 inline-flex space-x-2 bg-blue-900/10 text-sm">
      <Link href="/">Home</Link>
      <Link href="/admin">Admin</Link>
    </div>
  )
}

export { Navigation }
