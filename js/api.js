const url = 'https://my-apis-fcs.herokuapp.com/api/tmdb'

const getUrlImage = (fileName, size = 'original') => `https://image.tmdb.org/t/p/${size}${fileName}`

const getDados = async() => await fetch(url);