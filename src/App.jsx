import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
    return (
        <>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/movie/:id" element={<DetailsPage />} />
                </Routes>
            </main>
        </>
    )
}

export default App
