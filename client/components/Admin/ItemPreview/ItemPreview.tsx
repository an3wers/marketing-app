/* eslint-disable @next/next/no-img-element */
'use client'

import { PhotoItem, removePhoto, updatePhoto } from '@/servises/photos.service'
import { useState } from 'react'

interface Props {
  item: PhotoItem
  updateOrder: (id: number, order: number) => void
  removeItem: (id: number) => void
}

const ItemPreview = ({ item, updateOrder, removeItem }: Props) => {
  const [localItem, setLocalItem] = useState(item)

  function orderValueHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalItem(curr => ({ ...curr, order: +e.target.value }))
  }

  function blurHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, title, description, order, like_qty, dislike_qty } = localItem
    updatePhoto({ id, title, description, order, like_qty, dislike_qty }).then(
      () => updateOrder(localItem.id, +e.target.value)
    )
  }

  function removeHandler() {
    removePhoto(localItem.id).then(() => {
      removeItem(localItem.id)
    })
  }

  return (
    <li className=" flex space-x-4 hover:bg-gray-100 p-3 items-center">
      <div className=" flex flex-row items-baseline space-x-1">
        <span className=" text-sm text-gray-500">Id</span>
        <span>{localItem.id}</span>
      </div>
      <div className="grow">
        <img
          className="w-32 object-contain"
          alt={localItem.path}
          src={`http://localhost:5000/static/${localItem.path}`}
        />
      </div>
      <div className=" flex flex-row items-baseline space-x-1">
        <span className=" text-sm text-gray-500">L</span>
        <span>{localItem.like_qty}</span>
      </div>
      <div className=" flex flex-row items-baseline space-x-1">
        <span className=" text-sm text-gray-500">Dis</span>
        <span>{localItem.dislike_qty}</span>
      </div>
      <div className="flex flex-row items-baseline space-x-1">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          onChange={orderValueHandler}
          onBlur={blurHandler}
          value={localItem.order}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={removeHandler}
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          ×
        </button>
      </div>
    </li>
  )
}

export { ItemPreview }
