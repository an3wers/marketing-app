/* eslint-disable @next/next/no-img-element */
'use client'
import { PhotoItem, updatePhoto } from '@/servises/photos.service'
import { useEffect, useState } from 'react'

interface Props {
  item: PhotoItem
}

interface ItemLS {
  id: number
  isLike: boolean
  isDislike: boolean
}

type ItemsFromLs = Record<string, { isLike: boolean; isDislike: boolean }>

const LS_KEY = 'mrkt_items_santur'

const PhotoItem = ({ item }: Props) => {
  const [itemLocal, setItem] = useState(item)
  const [itemLS, setItemLs] = useState<ItemLS>({
    id: item.id,
    isLike: false,
    isDislike: false
  })

  /*
      Сохранить данные в LS
      Обновить локальные состояние
      Выполнить запрос на сервер
  */
  function dislikeHandler() {
    updatePhoto({
      id: itemLocal.id,
      title: itemLocal.title,
      description: itemLocal.description,
      order: itemLocal.order,
      dislike_qty: itemLocal.dislike_qty + 1,
      like_qty: itemLocal.like_qty
    }).then(() => {
      setItemToLS('isDislike')
      setItem(curr => ({ ...curr, dislike_qty: curr.dislike_qty + 1 }))
      setItemLs(curr => ({ ...curr, isDislike: true }))
    })
  }

  function likeHandler() {
    updatePhoto({
      id: itemLocal.id,
      title: itemLocal.title,
      description: itemLocal.description,
      order: itemLocal.order,
      dislike_qty: itemLocal.dislike_qty,
      like_qty: itemLocal.like_qty + 1
    }).then(() => {
      setItemToLS('isLike')
      setItem(curr => ({ ...curr, like_qty: curr.like_qty + 1 }))
      setItemLs(curr => ({ ...curr, isLike: true }))
    })
  }

  useEffect(() => {
    const itemsFromLS: ItemsFromLs | null = getItemsFromLS(LS_KEY)
    console.log('@itemsFromLS', itemsFromLS)
    if (itemsFromLS) {
      const item = itemsFromLS[itemLocal.id]

      if (item) {
        setItemLs(curr => ({
          ...curr,
          isLike: item.isLike,
          isDislike: item.isDislike
        }))
      }
    }
  }, [itemLocal.id])

  /*
    LS items { id: { isLike: true, isDislike: false } }
  */

  function setItemToLS(param: 'isLike' | 'isDislike') {
    // TODO: Подумать как зарефакторить
    let tmpMap: ItemsFromLs = {}
    const mapItems: ItemsFromLs | null = getItemsFromLS(LS_KEY)
    if (mapItems) {
      const curr = mapItems[itemLocal.id]

      if (curr) {
        isLike: param === 'isLike'
          ? (tmpMap = {
              ...mapItems,
              [itemLocal.id]: {
                ...curr,
                isLike: true
              }
            })
          : (tmpMap = {
              ...mapItems,
              [itemLocal.id]: {
                ...curr,
                isDislike: true
              }
            })
      } else {
        tmpMap = {
          ...mapItems,
          [itemLocal.id]: {
            isLike: param === 'isLike',
            isDislike: param === 'isDislike'
          }
        }
      }
    } else {
      tmpMap[itemLocal.id] = {
        isLike: param === 'isLike',
        isDislike: param === 'isDislike'
      }
    }

    localStorage.setItem(LS_KEY, JSON.stringify(tmpMap))
  }

  function getItemsFromLS(key: string) {
    const item = localStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }
    return null
  }

  return (
    <div className="relative">
      <div className="mb-2">
        <img
          className=" w-full object-contain"
          src={`http://localhost:5000/static/${itemLocal.path}`}
          alt={itemLocal.path}
        />
      </div>
      <div className=" flex space-x-4 justify-center">
        <button
          onClick={dislikeHandler}
          disabled={itemLS.isDislike}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-base px-5 py-3 disabled:opacity-40"
        >
          Dislike <span>{itemLocal.dislike_qty}</span>
        </button>
        <button
          onClick={likeHandler}
          disabled={itemLS.isLike}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-base px-5 py-3 disabled:opacity-40"
        >
          Like <span>{itemLocal.like_qty}</span>
        </button>
      </div>
    </div>
  )
}

export { PhotoItem }
