/* eslint-disable react-hooks/rules-of-hooks */
import { useConfig } from '@/servises/config'
import { PhotoItem } from '@/servises/photos.service'
import React, { useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'

// interface Props {
//   updateData: () => void
// }

interface State {
  title: string
  description: string
  img: string | File
  order: number
}

interface Props {
  onAddItem: (item: PhotoItem) => void
}

const { baseApi } = useConfig()

const FormCreateItem = ({ onAddItem }: Props) => {
  const [formValues, setFormValues] = useState<State>({
    title: '',
    description: '',
    img: '',
    order: 0
  })

  const fileInput = useRef<HTMLInputElement | null>(null)
  // const router = useRouter()

  async function formHandler(e: React.FormEvent) {
    e.preventDefault()
    const data = new FormData()

    data.append('title', formValues.title)
    data.append('description', formValues.description)
    data.append('img', formValues.img)
    data.append('order', formValues.order.toString())

    const res = await fetch(`${baseApi}/photos`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    })

    const resData = await res.json()

    if (resData?.message === 'created') {
      onAddItem(resData.data)
    }

    if (fileInput.current) {
      fileInput.current.value = ''
    }
    setFormValues(() => ({
      title: '',
      description: '',
      order: 0,
      img: ''
    }))
  }

  function changeFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : ''
    setFormValues(curr => ({ ...curr, img: file }))
  }

  async function checkApiHandler() {
    let res
    res = await fetch(baseApi, { credentials: 'include' })
    const data = await res.json()
    console.log('@Check res data', data)
  }

  return (
    <form onSubmit={formHandler} className="flex flex-col max-w-md space-y-4">
      <div className="input-group">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Заголовок
        </label>
        <input
          type="text"
          value={formValues.title}
          onChange={e =>
            setFormValues(curr => ({ ...curr, title: e.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Заголовок"
        />
      </div>
      <div className="input-group">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Описание
        </label>
        <textarea
          value={formValues.description}
          onChange={e =>
            setFormValues(curr => ({ ...curr, description: e.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Описание"
        />
      </div>
      <div className="input-group">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Картинка
        </label>
        <input
          ref={fileInput}
          onChange={changeFileHandler}
          type="file"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Название статической картинки"
        />
      </div>
      <div className="input-group">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Положение
        </label>
        <input
          value={formValues.order}
          onChange={e =>
            setFormValues(curr => ({ ...curr, order: +e.target.value }))
          }
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Номер"
        />
      </div>
      <div className=" inline-flex space-x-2">
        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Добавить
        </button>
        <button type="button" onClick={checkApiHandler}>
          Check Api
        </button>
      </div>
    </form>
  )
}

export { FormCreateItem }
