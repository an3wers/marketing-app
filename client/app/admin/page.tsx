import { FromCreateItem } from '@/components/Admin/FormCreateItem/FormCreateItem'
import { ListItems } from '@/components/Admin/ListItems/ListItems'
import { getPhotos } from '@/servises/photos.service'

async function fetchPhotos() {
  try {
    return await getPhotos()
  } catch (error) {
    console.log(error)
  }
}

export default async function AdminPage() {
  const data = await fetchPhotos()

  function update() {
    console.log('update')
  }

  return (
    <main className="flex min-h-screen flex-col space-y-6 divide-y">
      <h1 className="pt-6 text-xl">Admin page</h1>
      <section className="create-section pt-6">
        <h2 className="mb-4 text-lg">Добавить</h2>
        <FromCreateItem />
      </section>
      <section className="items-section">
        {/* <pre>{ data }</pre> */}
        <ListItems photos={data.data} />
      </section>
    </main>
  )
}
