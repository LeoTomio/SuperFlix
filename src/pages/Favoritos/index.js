import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix')
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirItens(id) {
        let filmesFiltrados = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filmesFiltrados)
        localStorage.setItem('@primeflix', JSON.stringify(filmesFiltrados))
        toast.success('Filme removido com sucesso!!')
    }


    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span> Você não possui nenhum filme na lista :(</span>}

            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => { excluirItens(item.id) }}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;