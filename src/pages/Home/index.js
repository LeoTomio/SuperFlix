import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './style.css'

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Estado para a página atual

    useEffect(() => {
        async function loadFilmes() {
            setLoading(true);
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: 'b0e0b492cd887aede31ca030d554b60b',
                    language: 'pt-BR',
                    page: page // Usando a página atual na chamada da API
                }
            });
            setFilmes(response.data.results.slice(0, 20));
            setLoading(false);
        }

        loadFilmes();
    }, [page]); // Adicione `page` como uma dependência para recarregar a cada mudança de página

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        );
    }

    // Funções para navegar entre as páginas
    const nextPage = () => setPage(prevPage => prevPage + 1);
    const prevPage = () => setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));

    return (
        <div className='container'>
            <div className='lista-filmes'>
                <h1>Bem vindo à Home</h1>
                {filmes.map((filme) => (
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <div className="imagem-e-botao">
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </div>
                    </article>
                ))}
            </div>

            {/* Botões de paginação */}
            <div className="pagination">
                <button onClick={prevPage} disabled={page === 1}>Anterior</button>
                <span>Página {page}</span>
                <button onClick={nextPage}>Próxima</button>
            </div>
        </div>
    );
}

export default Home;
