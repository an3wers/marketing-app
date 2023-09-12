import { PhotoItem } from '@/servises/photos.service'
// import { useState } from 'react'
import { ItemPreview } from '../ItemPreview/ItemPreview'

interface Props {
  photos: PhotoItem[]
  updateOrder: (id: number, order: number) => void
  removeItem: (id: number) => void
}

const ListItems = ({ photos, updateOrder, removeItem }: Props) => {
  return (
    <ul className="max-w-4xl">
      {!!photos && photos.length > 0 &&
        photos.map(p => (
          <ItemPreview
            removeItem={removeItem}
            updateOrder={updateOrder}
            key={p.id}
            item={p}
          />
        ))}
    </ul>
  )
}

export { ListItems }
