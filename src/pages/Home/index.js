import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './style.css'
//URL DA API : /movie/latest?api_key=b0e0b492cd887aede31ca030d554b60b&language=pt-br

function Home() {

    const [filmes, setFilmes] = useState([])


    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: 'b0e0b492cd887aede31ca030d554b60b',
                    language: 'pt-BR',
                    page: 1
                }
            })
            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0, 10))
        }

        loadFilmes()
    })



    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}> Acessar </Link>
                        </article>
                    )
                })}
                <h1>Bem vindo a Home</h1>
            </div>
        </div>
    )
}
export default Home;