const API_KEY = "api_key=f75b36d68c9859192cb612c8ec7b03d0";
const API_BASE = "https://api.themoviedb.org/3";
const urlOptions = '&sort_by=popularity.desc&include_adult=false&language=pt-br&'

const getUrl = path => `${API_BASE}${path}${urlOptions}${API_KEY}`;

const getUrlData = path => fetch(`${API_BASE}${path}${urlOptions}${API_KEY}`);
const getUrlImage = (fileName, size = 'original') => `https://image.tmdb.org/t/p/${size}${fileName}`

const getDados = async() => {
    const data = await getUrlData('/genre/movie/list?');
    const { genres } = await data.json();

    const lista = [{
            name: 'Netflix',
            path: '/discover/tv?with_networks=213'
        }, {
            name: 'Recomendados',
            path: '/trending/all/week?'
        }, {
            name: 'Mais votados',
            path: '/movie/top_rated?'
        },
        ...genres
    ];
    lista.map(genre => genre.id && (genre.path = `/discover/movie?with_genres=${genre.id}`));

    const listaRequisicoes = lista.map(genre => getUrlData(genre.path));

    const dados = await Promise.all(listaRequisicoes).then(data => {
        return Promise.all(data.map(res => res.json()))
    }).then(data => {
        data.map((genre, index) => {
            lista[index].data = genre.results
        })
    });

    return lista
}