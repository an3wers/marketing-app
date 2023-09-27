/* eslint-disable react-hooks/rules-of-hooks */
import { useConfig } from './config'

const { baseApi } = useConfig()
const apiUrl = `${baseApi}/reaction`

export const createReaction = async (param: 'like' | 'dislike') => {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ reaction: param })
  })
  const resData = await res.json()
  return resData
}
