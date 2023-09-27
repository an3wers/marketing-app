// import Image from 'next/image'

import { FirstScreen } from '@/components/FirstScreen/FirstScreen'
import { FromEditor } from '@/components/FromEditor/FromEditor'
import { FunnyStoriesHeader } from '@/components/FunnyStoriesHeader/FunnyStoriesHeader'
import { GuessWho } from '@/components/GuessWho/GuessWho'
import { HighFive } from '@/components/HighFive/HighFive'
import { PhotoItem as PhotoItemComp } from '@/components/PhotoItem/PhotoItem'
import { TheEnd } from '@/components/TheEnd/TheEnd'
import { TrueStories } from '@/components/TrueStories/TrueStories'
import { PhotoItem, getPhotos } from '@/servises/photos.service'

async function getAllPhotos() {
  try {
    const res = await getPhotos()
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default async function Home() {
  const data = (await getAllPhotos()) as PhotoItem[]
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto space-y-10 md:space-y-16 xl:space-y-24 py-16">
        <FirstScreen />
        <FromEditor />
        <div className=" flex flex-col space-y-10 md:space-y-16 xl:space-y-24 py-16">
          <FunnyStoriesHeader />
          {!!data &&
            data.length > 0 &&
            data.map(item => <PhotoItemComp key={item.id} item={item} />)}
        </div>
        <div className="relative">
          <GuessWho />
        </div>
        <TrueStories />
        <HighFive />
        <TheEnd />
      </div>
    </main>
  )
}
