/* eslint-disable @next/next/no-img-element */
'use client'

import { PhotoItem } from '@/servises/photos.service'
import { useState } from 'react'

interface Props {
  item: PhotoItem
  updateOrder: (id: number, order: number) => void
}

const ItemPreview = ({ item, updateOrder }: Props) => {
  const [localItem, setLocalItem] = useState(item)

  function orderValueHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalItem(curr => ({ ...curr, order: +e.target.value }))
  }

  function blurHandler(e: React.ChangeEvent<HTMLInputElement>) {
    updateOrder(localItem.id, +e.target.value)
  }

  return (
    <li className=" flex space-x-4 hover:bg-gray-100 p-3">
      <div className=" flex flex-col">
        <span className=" text-sm text-gray-500">Id</span>
        <span>{localItem.id}</span>
      </div>
      <div className="grow">
        <img
          className="w-32 object-contain"
          alt={localItem.path}
          src={`http://localhost:5000/${localItem.path}`}
        />
      </div>
      <div className=" flex flex-col">
        <span className=" text-sm text-gray-500">Like</span>
        <span>{localItem.like_qty}</span>
      </div>
      <div className=" flex flex-col">
        <span className=" text-sm text-gray-500">Dislike</span>
        <span>{localItem.dislike_qty}</span>
      </div>
      <div className=" flex flex-col">
        <span className=" text-sm text-gray-500">Порядок</span>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          onChange={orderValueHandler}
          onBlur={blurHandler}
          value={localItem.order}
        />
      </div>
    </li>
  )
}

export { ItemPreview }
