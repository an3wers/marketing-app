'use client'

import { PhotoItem } from '@/servises/photos.service'
import { useState } from 'react'
import { ItemPreview } from '../ItemPreview/ItemPreview'

interface Props {
  photos: PhotoItem[]
}

const ListItems = ({ photos }: Props) => {
  const [items, setItems] = useState(photos)

  function updateItemOrder(id: number, order: number) {
    setItems(curr => {
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

  return (
    <ul className=" max-w-4xl">
      {photos.map(p => (
        <ItemPreview updateOrder={updateItemOrder} key={p.id} item={p} />
      ))}
    </ul>
  )
}

export { ListItems }
