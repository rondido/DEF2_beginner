import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '../../stores/movie'
import { useQuery } from '@tanstack/react-query'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const searchText = useMovieStore(state => state.searchText)
  // const movies = useMovieStore(state => state.movies)
  // const searchMovies = useMovieStore(state => state.searchMovies)
  const setSearchText = useMovieStore(state => state.setSearchText)

  const { data: movies, refetch } = useQuery<Movie[]>({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      return Search
    },
    staleTime: 1000 * 60 * 60 * 24,
    //활성화를 false를 하면 처음에 query를 실행하게 하지 마라
    enabled: false
  })

  return (
    <>
      <h1>Movies</h1>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && refetch()}
      />

      <button onClick={() => refetch()}>검색</button>
      <ul>
        {movies?.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
