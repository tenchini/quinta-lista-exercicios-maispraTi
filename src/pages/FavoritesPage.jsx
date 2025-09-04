import {useFavorites} from '../hooks/useFavorites'
import MovieCard from '../components/MovieCard'

function FavoritesPage() {
    const {favorites} = useFavorites()

    return (
        <div>
            <div className="page-title-container">
                <h2>Seus Filmes Favoritos</h2>
            </div>

            {favorites.length === 0 ? (
                <p className="message">Você ainda não adicionou nenhum filme aos favoritos.</p>
            ) : (
                <div className="movie-grid">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} variant="favorites" />
                    ))}
                </div>
            )}
        </div>
    )
}

export default FavoritesPage
