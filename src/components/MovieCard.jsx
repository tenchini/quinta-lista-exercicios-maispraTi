import {Link} from 'react-router-dom'
import {useFavorites} from '../hooks/useFavorites'
import {FaHeart, FaRegHeart, FaTimes} from 'react-icons/fa'
import {useState} from 'react'

const IMG_PLACEHOLDER = 'https://via.placeholder.com/220x330.png?text=No+Image'

function MovieCard({movie, variant = 'search'}) {
    const {addFavorite, removeFavorite, isFavorite} = useFavorites()
    const isMovieFavorite = isFavorite(movie.id)
    const [isRemoving, setIsRemoving] = useState(false)

    const handleToggleFavorite = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (isMovieFavorite) {
            if (variant === 'favorites') {
                setIsRemoving(true)
                setTimeout(() => {
                    removeFavorite(movie.id)
                }, 300)
            } else {
                removeFavorite(movie.id)
            }
        } else {
            addFavorite(movie)
        }
    }

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : IMG_PLACEHOLDER

    const renderIcon = () => {
        if (variant === 'favorites') {
            return <FaTimes />
        }
        return isMovieFavorite ? <FaHeart /> : <FaRegHeart />
    }

    const getTitle = () => {
        if (variant === 'favorites') {
            return 'Remover dos favoritos'
        }
        return isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
    }

    return (
        <div className={`movie-card ${isRemoving ? 'removing' : ''}`}>
            <Link to={`/movie/${movie.id}`}>
                <div className="poster-container">
                    <img src={posterUrl} alt={movie.title} />
                    <div className="action-overlay">
                        <button
                            onClick={handleToggleFavorite}
                            className={isMovieFavorite ? 'is-favorite' : ''}
                            title={getTitle()}>
                            {renderIcon()}
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MovieCard
