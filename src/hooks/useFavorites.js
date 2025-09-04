import {useState, useEffect} from 'react'

const FAVORITES_KEY = 'movie-favorites'

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem(FAVORITES_KEY)
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (movie) => {
        setFavorites((prevFavorites) => [...prevFavorites, movie])
    }

    const removeFavorite = (movieId) => {
        setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId)
    }

    return {favorites, addFavorite, removeFavorite, isFavorite}
}
