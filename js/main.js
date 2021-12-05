const inicializarOwl = () => {
    return $('.owl-carousel').owlCarousel({
        center: true,
        dots: false,
        loop: true,
        margin: 10,
        nav: true,
        autoWidth: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })
}

const criarTituloPrincipal = data => {
    $('.filme-principal .titulo').text(data.name || data.title || data.original_name)
    $('.filme-principal .descricao').text(data.overview);
    $('.filme-principal').css({
        'background': `linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)100%), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        'background-size': 'cover'
    });
}

const carregarCarrosel = (name, data) => {
    const carrosel = $('<div class="owl-carousel owl-theme"></div>')

    data.forEach(filme => {
        if (!filme.backdrop_path) return;
        console.log(filme)
        carrosel.append(`
                <div class="item">
                    <img src="${getUrlImage(filme.poster_path,'w200')}" alt="" class="box-filme">
                </div>
                `)
    });
    const title = $(`<h2 class=genero-titulo>${name}</h2>`)
    $('.carrosel-filmes').append(title)
    $('.carrosel-filmes').append(carrosel)
}

$(async function() {
    try {
        const result = await getDados();
        const dados = await result.json()

        criarTituloPrincipal(dados[0].data.results[0])

        dados.map(genre => carregarCarrosel(genre.genre, genre.data.results))

        inicializarOwl()

    } catch (error) {
        console.log(error)
    }

    window.dispatchEvent(new Event('resize')); //refresh no carrosel
})