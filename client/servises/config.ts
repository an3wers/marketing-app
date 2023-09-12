const useConfig = () => {
  let baseApi: string = ''
  let baseUrl: string = ''

  if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://humor.santur.ru'
    baseApi =
      typeof window === 'undefined'
        ? 'http://server:5000/api'
        : 'https://humor.santur.ru/api'
  } else {
    baseUrl = 'http://localhost:5000'
    baseApi =
      typeof window === 'undefined'
        ? 'http://localhost:5000/api' //'http://server:5000/api' // if docker 
        : 'http://localhost:5000/api'
  }

  return {
    baseApi,
    baseUrl
  }
}

export { useConfig }
