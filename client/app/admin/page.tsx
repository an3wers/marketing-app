import { FromCreateItem } from '@/components/Admin/FormCreateItem/FormCreateItem'

export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col space-y-6 divide-y">
      <h1 className="pt-6 text-xl">Admin page</h1>
      <section className="create-section pt-6">
        <h2 className="mb-4 text-lg">Добавить</h2>
        <FromCreateItem />
      </section>
      <section className="items-section"></section>
    </main>
  )
}
