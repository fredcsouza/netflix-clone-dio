const createMainTitle = data => {
    $('.filme-principal .titulo').text(data.name || data.title || data.original_name)
    $('.filme-principal .descricao').text(data.overview);
    $('.filme-principal').css({
        'background': `linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)100%), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        'background-size': 'cover'
    });
}

const createCarousel = (name, data) => {
    let list = ''

    data.forEach(filme => {
        if (!filme.backdrop_path) return;

        list = `
                    ${list}
                    <li class="glide__slide">
                        <div class="item">
                            <img src="${getUrlImage(filme.poster_path,'w200')}" alt="" class="box-filme">
                        </div>
                    </li>
                    `
    });

    return `
    <h2 class=genero-titulo>${name}</h2>

    <div class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${list}
            </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><span><</span></button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">"><span>></span></button>
        </div>
    </div>
    `
}


const loadCarrousels = (dados) => {
    dados.map(genre => {
        $('.wrapper-carousels').append(createCarousel(genre.genre, genre.data.results))
    })

    const glideConfig = {
        type: 'carousel',
        startAt: 0,
        perView: 9,
        gap: 12,
        breakpoints: {
            1000: {
                perView: 7,
            },
            800: {
                perView: 5,
            },
            600: {
                perView: 3,
            },
            400: {
                perView: 1,
            }
        }
    }

    document.querySelectorAll('.glide').forEach(item => {
        new Glide(item, glideConfig).mount()
    })
}


$(async function() {
    try {
        const result = await getDados();
        const dados = await result.json()

        createMainTitle(dados[0].data.results[0])
        loadCarrousels(dados)
    } catch (error) {
        console.log(error)
    }
})