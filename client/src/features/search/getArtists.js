const getArtists = (artistsArr) => {
  if (!artistsArr) return
  let allArtists = []
  artistsArr.forEach((artist) => {
    allArtists.push(artist.name)
  })
  return allArtists.join(', ')
}

export default getArtists
