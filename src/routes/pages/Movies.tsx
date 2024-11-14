import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '../../stores/movie'

export interface ReponseValue {
  Search: Movie[]
  totalResults: string
  Response: string
}

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  // const [searchText, setSearchText] = useState<string>('')
  // const [movies, setMovies] = useState<Movie[]>([])
  const searchText = useMovieStore(state => state.searchText)
  const movies = useMovieStore(state => state.movies)
  const searchMovies = useMovieStore(state => state.searchMovies)

  return (
    <>
      <h1>Movies</h1>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && serarchMovie()}
      />

      <button onClick={() => searchMovies()}>검색</button>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
