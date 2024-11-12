import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

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
  const [searchText, setSearchText] = useState<string>('')
  const [movies, setMovies] = useState<Movie[]>([])

  async function serarchMovie() {
    const res = await fetch(
      `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
    )
    const { Search } = await res.json()
    setMovies(Search)
  }

  return (
    <>
      <h1>Movies</h1>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && serarchMovie()}
      />

      <button onClick={serarchMovie}>검색</button>
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
