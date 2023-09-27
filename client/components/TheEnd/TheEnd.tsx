/* eslint-disable @next/next/no-img-element */
'use client'
import { createReaction } from '@/servises/reaction.service'
import { useEffect, useState } from 'react'

const LS_KEY = 'reaction'

const TheEnd = () => {
  const [isReaction, setIsReaction] = useState(false)

  // LS reaction: like | dislike
  useEffect(() => {
    const res = localStorage.getItem(LS_KEY)
    if (res !== null) setIsReaction(true)
  }, [])

  const ReactionHandler = async (param: 'like' | 'dislike') => {
    try {
      setIsReaction(true)
      localStorage.setItem(LS_KEY, param)
      await createReaction(param)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className=" flex flex-col justify-center">
      <img src="/images/the_end.png" className="w-full" alt="" />
      <div className="flex justify-center space-x-3 mt-10">
        <button
          disabled={isReaction}
          onClick={() => ReactionHandler('like')}
          className="text-green-900 min-w-[80px] md:min-w-[140px] max-w-[240px] mb-3 mr-3 inline-flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-4 font-medium rounded-full text-2xl px-3 py-2 md:px-5 md:py-4 bg-green-400 hover:bg-green-500 focus:ring-green-300 disabled:opacity-50"
        >
          Да
        </button>
        <button
          disabled={isReaction}
          onClick={() => ReactionHandler('like')}
          className="text-red-900 min-w-[80px] md:min-w-[140px] max-w-[240px] mb-3 mr-3 inline-flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-4 font-medium rounded-full text-2xl px-3 py-2 md:px-5 md:py-4 bg-red-400 hover:bg-red-500 focus:ring-orange-300 disabled:opacity-50"
        >
          Нет
        </button>
      </div>
    </div>
  )
}

export { TheEnd }
