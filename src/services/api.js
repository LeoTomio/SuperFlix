import axios from 'axios'
//Base da URL : https://api.themoviedb.org/3
//URL DA API : /movie/latest?api_key=b0e0b492cd887aede31ca030d554b60b&language=pt-br
// http://api.themoviedb.org/3/movie/now_playing?api_key=b0e0b492cd887aede31ca030d554b60b&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;