import { useEffect, useState } from 'react';
import './App.css';
import Search from './Search';
import Movies from './Movies';
import Searchicon from './assets/search.png';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=f7ebe7e';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async (title = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (error) {
      console.error('Error fetching movie information:', error);
      setError('Error fetching movie information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies('man');
  }, []);

  return (
    <div className="app">
      <h1>Movieland</h1>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchMovies={searchMovies}
      />
      {loading ? (
        <div className="loading"><h2>Loading...</h2></div>
      ) : error ? (
        <div className="error"><h2>{error}</h2></div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Movies key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
