/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import debounce from 'lodash.debounce'
import { GuessWhoItem } from './GuessWhoItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './guessWho.css'

const data = [
  {
    id: 10,
    path: '/images/13-min.png',
    options: ['Калиниченко Леонид', 'Степанов Владимир', 'Сивков Виталий'],
    correct_option: 'Степанов Владимир'
  },
  {
    id: 1,
    path: '/images/1-min.png',
    options: ['Пузеева Ольга', 'Лайза Минелли', 'Балыбердина Елена'],
    correct_option: 'Балыбердина Елена'
  },
  {
    id: 11,
    path: '/images/11-min.png',
    options: [
      'Сараев Сергей',
      'Сараев Антон',
      'Да, кто их разберет, двое из ларца – одинаковых с лица'
    ],
    correct_option: 'Сараев Антон'
  },
  {
    id: 2,
    path: '/images/2-min.png',
    options: [
      'Пузеева Ольга',
      'Брюнетка с красивыми глазами',
      'Богинская Кристина'
    ],
    correct_option: 'Пузеева Ольга'
  },
  {
    id: 3,
    path: '/images/8-min.png',
    options: ['Чуракова Ольга', 'Блондинка в законе', 'Кондюрина Анна'],
    correct_option: 'Кондюрина Анна'
  },
  {
    id: 4,
    path: '/images/10-min.png',
    options: ['Рахматуллин Рустам', 'Плюшевый медвежонок', 'Сибагатов Вадим'],
    correct_option: 'Рахматуллин Рустам'
  },
  {
    id: 5,
    path: '/images/4-min.png',
    options: ['Мерлин Монро', 'Дудак Олеся', 'Соколова Алена'],
    correct_option: 'Дудак Олеся'
  },
  {
    id: 6,
    path: '/images/16-min.png',
    options: ['Султан', 'Шайсултанов Дамир', 'Главный на ПВЗ'],
    correct_option: 'Шайсултанов Дамир'
  },
  {
    id: 7,
    path: '/images/14-min.png',
    options: [
      'Рыков Никита',
      'Федорцев Виталий Викторович',
      'Григоренко Сергей'
    ],
    correct_option: 'Федорцев Виталий Викторович'
  },
  {
    id: 8,
    path: '/images/5-min.png',
    options: [
      'Вараксин Андрей',
      'Артемов Павел',
      'Гомер такой, мужчина с бородой'
    ],
    correct_option: 'Вараксин Андрей'
  },
  {
    id: 9,
    path: '/images/3-min.png',
    options: ['Железный Человек', 'Беглов Игорь', 'Сложно сказать'],
    correct_option: 'Беглов Игорь'
  },

  {
    id: 12,
    path: '/images/6-min.png',
    options: ['Зарубина Ксения', 'Таушканова Ирина', 'Малышева Наталья'],
    correct_option: 'Зарубина Ксения'
  },
  {
    id: 13,
    path: '/images/15-min.png',
    options: ['Раевских Татьяна', 'Хитрова Елена', 'Ращепкина Наталья'],
    correct_option: 'Хитрова Елена'
  },
  {
    id: 14,
    path: '/images/12-min.png',
    options: ['Соколова Алена', 'Строголева Евгения', 'Плотникова Диана'],
    correct_option: 'Соколова Алена'
  },
  {
    id: 15,
    path: '/images/7-min.png',
    options: ['Игорь Романович', 'Игорь Романович', 'Игорь Романович'],
    correct_option: 'Игорь Романович'
  },
  {
    id: 16,
    path: '/images/9-min.png',
    options: ['Миронова Алена', 'Ненашева Анастасия'],
    correct_option: 'Ненашева Анастасия'
  }
]

const GuessWho = () => {
  const [swiper, setSwiper] = useState<any | null>(null)

  const nextSlideHandler = () => {
    if (swiper !== null) swiper.slideNext()
  }

  const nextDelay = debounce(nextSlideHandler, 1300)

  return (
    <div className="space-y-10 md:space-y-16">
      <div className=" flex justify-center">
        <img src="/images/GuessWho-min.png" className="w-full" alt="" />
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        onSwiper={swiper => setSwiper(swiper)}
      >
        {data.map(item => (
          <SwiperSlide key={item.id}>
            <GuessWhoItem nextHandler={nextDelay} data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export { GuessWho }
