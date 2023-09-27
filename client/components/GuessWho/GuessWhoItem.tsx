/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'

const generalClesses =
  'text-gray-900 min-w-[80px] md:min-w-[140px] max-w-[240px] mb-3 mr-3 inline-flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-4 font-medium rounded-full text-base px-3 py-2 md:px-5 md:py-4 disabled:opacity-50'
const defaultClasess = ' bg-white/30 hover:bg-white/40 focus:ring-gray-200'
const successClasses = ' bg-green-500 hover:bg-green-500 focus:ring-green-300'
const errorClasses =
  ' bg-orange-500 bg-opacity-70 hover:bg-orange-500 hover:bg-opacity-70 focus:ring-orange-300'

const GuessWhoItem = ({
  data,
  nextHandler
}: {
  data: Record<string, any>
  nextHandler: () => void
}) => {
  const [answer, setAnswer] = useState('')

  const answerHandler = (value: string) => {
    setAnswer(() => value)
    nextHandler()
  }

  return (
    <div className="guess-who-item flex justify-center">
      <div className="max-w-[500px]">
        <img className="w-full object-cover" src={data.path} alt={data.path} />
        <div className=" flex mt-3 flex-wrap justify-center">
          {data.options.map((opt: string) => (
            <button
              onClick={() => answerHandler(opt)}
              key={opt}
              className={generalClesses.concat(
                answer === ''
                  ? defaultClasess
                  : opt === data.correct_option
                  ? successClasses
                  : errorClasses
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export { GuessWhoItem }
