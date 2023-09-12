// import Image from 'next/image'

import { PhotoItem as PhotoItemComp } from '@/components/PhotoItem/PhotoItem'
import { PhotoItem, getPhotos } from '@/servises/photos.service'

async function getAllPhotos() {
  try {
    const res = await getPhotos()
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const data = (await getAllPhotos()) as PhotoItem[]
  return (
    <main className="flex min-h-screen flex-col bg-zinc-800">
      <div className="container mx-auto">
        <div className=" flex flex-col space-y-12">
          {!!data && data.length > 0 &&
            data.map(item => <PhotoItemComp key={item.id} item={item} />)}
        </div>
      </div>
    </main>
  )
}
