'use client'

import { FormCreateItem } from '@/components/Admin/FormCreateItem/FormCreateItem'
import { ListItems } from '@/components/Admin/ListItems/ListItems'
import { PhotoItem, getPhotos } from '@/servises/photos.service'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [isError, setIsError] = useState('')

  function updateOrderHandler(id: number, order: number) {
    setPhotos(curr => {
      return curr.map(c => {
        if (c.id === id) {
          return { ...c, order }
        }
        {
          return c
        }
      })
    })
  }

  function addHandler(data: PhotoItem) {
    setPhotos(curr => [...curr, data])
  }

  function removeHandler(id: number) {
    setPhotos(curr => curr.filter(item => item.id !== id))
  }

  useEffect(() => {
    getPhotos()
      .then(data => setPhotos(curr => [...data.data]))
      .catch(err => setIsError(err.message))
  }, [])

  return (
    <main className="flex min-h-screen flex-col space-y-6 divide-y">
      <h1 className="pt-6 text-xl">Admin page</h1>
      <section className="create-section pt-6">
        <h2 className="mb-4 text-lg">Добавить</h2>
        <FormCreateItem onAddItem={addHandler} />
      </section>
      <section className="items-section">
        <ListItems
          removeItem={removeHandler}
          updateOrder={updateOrderHandler}
          photos={photos}
        />
      </section>
    </main>
  )
}
