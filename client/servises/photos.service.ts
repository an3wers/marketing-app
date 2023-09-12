const apiUrl =
  typeof window === 'undefined'
    ? 'http://server:5000/api/photos'
    : 'http://localhost:5000/api/photos'

interface RequstUpdateReaction {
  id: number
  reaction: 'like' | 'dislike'
}

interface RequstUpdate {
  id: number
  title: string
  description: string
  order: number
  like_qty: number
  dislike_qty: number
}

export interface PhotoItem {
  id: number
  title: string
  description: string
  path: string
  order: number
  like_qty: number
  dislike_qty: number
  createdAt: string
  updatedAt: string
}

export const createPhoto = async (data: FormData) => {
  const res = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    body: data
  })
  const resData = await res.json()
  return resData
}

export const getPhotos = async () => {
  const res = await fetch(apiUrl, { credentials: 'include', cache: 'no-store' })
  const resData = await res.json()
  return resData
}

export const updateReactionPhoto = async ({
  id,
  reaction
}: RequstUpdateReaction) => {
  const res = await fetch(apiUrl, {
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify({ id, reaction }) // Передавать id в параметрах
  })
  const resData = res.json()
  return resData
}

export const updatePhoto = async (data: RequstUpdate) => {
  const { id, ...otherData } = data
  const res = await fetch(`${apiUrl}/${id}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(otherData)
  })
  const resData = await res.json()
  return resData
}

export const removePhoto = async (id: number) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    credentials: 'include',
    method: 'DELETE'
  })

  const resData = await res.json()
  return resData
}
