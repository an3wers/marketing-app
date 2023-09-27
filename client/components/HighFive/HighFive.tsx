/* eslint-disable @next/next/no-img-element */
const HighFive = () => {
  return (
    <div className=" flex flex-col justify-center space-y-10 md:space-y-16">
      <img className="w-full" src="/images/high_five.png" alt="" />
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="">
          <video loop muted controls playsInline width="100%">
            <source src="/video/video1.mp4" type="video/mp4" />
            Ваш браузер не поддерживает встроенные видео.
          </video>
        </div>
        <div className="">
        <video loop muted controls playsInline width="100%">
            <source src="/video/video2.mp4" type="video/mp4" />
            Ваш браузер не поддерживает встроенные видео.
          </video>
        </div>
        <div className="">
        <video loop muted controls playsInline width="100%">
            <source src="/video/video3.mp4" type="video/mp4" />
            Ваш браузер не поддерживает встроенные видео.
          </video>
        </div>
      </div>
    </div>
  )
}

export { HighFive }
