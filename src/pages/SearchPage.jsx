import {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL

const genres = [
    {id: 28, name: 'Ação'},
    {id: 12, name: 'Aventura'},
    {id: 16, name: 'Animação'},
    {id: 35, name: 'Comédia'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentário'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Família'},
    {id: 14, name: 'Fantasia'},
    {id: 36, name: 'História'},
    {id: 27, name: 'Terror'},
    {id: 10402, name: 'Música'},
    {id: 9648, name: 'Mistério'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Ficção Científica'},
    {id: 10770, name: 'Cinema TV'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'Guerra'},
    {id: 37, name: 'Faroeste'},
]

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [movies, setMovies] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const query = searchParams.get('query') || ''
    const genre = searchParams.get('genre') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true)
            setError(null)

            const apiPage = Math.ceil(page / 2)
            let url = `${apiUrl}/movie/popular`
            let params = {api_key: apiKey, language: 'pt-BR', page: apiPage, region: 'BR'}

            if (query) {
                url = `${apiUrl}/search/movie`
                params.query = query
            } else if (genre) {
                url = `${apiUrl}/discover/movie`
                params.with_genres = genre
            }

            try {
                const response = await axios.get(url, {params})
                const allResults = response.data.results

                const moviesToShow = page % 2 === 1 ? allResults.slice(0, 10) : allResults.slice(10, 20)

                setMovies(moviesToShow)
                setTotalPages(response.data.total_pages * 2)
            } catch (err) {
                console.error(err)
                setError('Falha ao buscar filmes. Tente novamente.')
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [query, genre, page])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        const newQuery = e.target.elements.query.value
        setSearchParams({query: newQuery, page: '1'})
    }

    const handleGenreChange = (e) => {
        const newGenre = e.target.value
        if (newGenre) {
            setSearchParams({genre: newGenre, page: '1'})
        } else {
            setSearchParams({page: '1'})
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            const newParams = new URLSearchParams(searchParams)
            newParams.set('page', newPage)
            setSearchParams(newParams)
        }
    }

    const getTitle = () => {
        if (query) return `Resultados para "${query}"`
        if (genre) return `Resultados para "${genres.find((g) => g.id == genre)?.name}"`
        return 'Filmes Populares'
    }

    return (
        <div>
            <div className="search-container">
                <div>
                    <p>Busque por um título específico</p>
                    <form onSubmit={handleSearchSubmit}>
                        <input type="text" name="query" defaultValue={query} placeholder="Ex: O Poderoso Chefão..." />
                    </form>
                </div>
                <div>
                    <p>Ou filtre por um gênero</p>
                    <select value={genre} onChange={handleGenreChange}>
                        <option value="">Todos os populares</option>
                        {genres.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <p className="message" style={{color: 'red'}}>
                    {error}
                </p>
            )}

            {!loading && movies.length === 0 && <p className="message">Nenhum filme encontrado.</p>}

            {!error && (
                <>
                    <div className="page-title-container">
                        <h2>{getTitle()}</h2>
                        {totalPages > 0 && <span className="page-info">Página {page}</span>}
                    </div>
                    <div className="grid-container">
                        <button
                            className="grid-nav-button"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}>
                            <FaChevronLeft />
                        </button>
                        <div className={`movie-grid ${loading ? 'loading' : ''}`}>
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        <button
                            className="grid-nav-button"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}>
                            <FaChevronRight />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default SearchPage
