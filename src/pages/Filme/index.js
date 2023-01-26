import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import api from '../../services/api';
import './filme-info.css'
function Filme() {
    const { id_filme } = useParams();
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id_filme}`, {
                params: {
                    api_key: 'b0e0b492cd887aede31ca030d554b60b',
                    language: 'pt-BR',
                }

            }).then((response) => {
                setFilme(response.data)
                setLoading(false)
            }).catch(() => {
                navigate("/", { replace: true })
                console.log('filme nao encontrado')
            })
        }
        loadFilme();


        return () => {
            console.log('COMPONENTE DESMONTADO')
        }
    }, [])

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }


    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button>Salvar</button>
                <button>
                    <a href='#'>Trailer</a>
                </button>
            </div>

        </div>
    )
}
export default Filme;