import useAxios from 'hooks/useAxios'

const useQueueSong = () => {
  const { backendApiCall } = useAxios()
  const queueSong = async (uri) => {
    const config = {
      url: '/player/queue-song',
      method: 'put',
      data: {
        uri: uri,
      },
    }
    await backendApiCall(config)
  }
  return { queueSong }
}

export default useQueueSong
