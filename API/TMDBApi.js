const API_Token = "b2c3a6804776cbe26d0a18112c34b3ac"

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_Token + '&query=' + text + '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetails(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_Token
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

// get the best films
export function getFilmsNew(page) {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_Token + '&vote_count.gte=1000&sort_by=release_date.desc&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}