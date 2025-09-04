import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useFavorites} from '../hooks/useFavorites'
import {FaHeart, FaRegHeart, FaArrowLeft} from 'react-icons/fa'

const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const IMG_PLACEHOLDER = 'https://via.placeholder.com/300x450.png?text=No+Image'

function DetailsPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {addFavorite, removeFavorite, isFavorite} = useFavorites()

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true)
            setError(null)
            try {
                const detailsResponse = await axios.get(`${apiUrl}/movie/${id}`, {
                    params: {api_key: apiKey, language: 'pt-BR'},
                })
                const creditsResponse = await axios.get(`${apiUrl}/movie/${id}/credits`, {
                    params: {api_key: apiKey, language: 'pt-BR'},
                })

                const director = creditsResponse.data.crew.find((p) => p.job === 'Director')

                setMovie({
                    ...detailsResponse.data,
                    director: director ? director.name : 'N/A',
                    cast: creditsResponse.data.cast.slice(0, 10),
                })
            } catch (err) {
                console.error(err)
                setError('Não foi possível carregar os detalhes do filme.')
            } finally {
                setLoading(false)
            }
        }
        fetchMovieDetails()
    }, [id])

    if (loading) return <p className="message">Carregando detalhes...</p>
    if (error)
        return (
            <p className="message" style={{color: 'red'}}>
                {error}
            </p>
        )
    if (!movie) return <p className="message">Filme não encontrado.</p>

    const isMovieFavorite = isFavorite(movie.id)

    const handleToggleFavorite = () => {
        if (isMovieFavorite) {
            removeFavorite(movie.id)
        } else {
            addFavorite(movie)
        }
    }

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : IMG_PLACEHOLDER

    return (
        <div className="details-page">
            <img src={posterUrl} alt={movie.title} />
            <div className="details-info">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Voltar
                </button>
                <h1>
                    {movie.title} {movie.release_date && <span>({movie.release_date.substring(0, 4)})</span>}
                </h1>
                <p>
                    <strong>Sinopse:</strong> {movie.overview || 'Sinopse não disponível.'}
                </p>
                <p>
                    <strong>Avaliação:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
                </p>
                <p>
                    <strong>Diretor:</strong> {movie.director}
                </p>
                <h3>Elenco Principal:</h3>
                <ul>
                    {movie.cast && movie.cast.length > 0 ? (
                        movie.cast.map((actor) => (
                            <li key={actor.cast_id}>
                                {actor.name} (como {actor.character})
                            </li>
                        ))
                    ) : (
                        <li>Informações do elenco não disponíveis.</li>
                    )}
                </ul>
                <button
                    onClick={handleToggleFavorite}
                    className={`details-favorite-button ${isMovieFavorite ? 'is-favorite' : ''}`}>
                    {isMovieFavorite ? <FaHeart /> : <FaRegHeart />}
                    {isMovieFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
            </div>
        </div>
    )
}

export default DetailsPage
