import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '../../stores/movie'
import { useQueryClient, useQuery } from '@tanstack/react-query'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const inputText = useMovieStore(state => state.searchText)
  const setInputText = useMovieStore(state => state.setSearchText)
  const searchText = useMovieStore(state => state.searchText)
  // const movies = useMovieStore(state => state.movies)
  // const searchMovies = useMovieStore(state => state.searchMovies)
  const setSearchText = useMovieStore(state => state.setSearchText)
  const queryClient = useQueryClient()
  const { data: movies } = useQuery<Movie[]>({
    queryKey: ['movies', searchText],

    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      return Search
    },
    //신선함 유지 시간, 캐싱되는 시간
    staleTime: 1000 * 60 * 60 * 24, //gcTime의 기본 5분이 초과해서 캐싱하면, 캐시 삭제

    gcTime: 1000 * 60 * 60 * 2, //gcTime도 같이 늘려주자!
    //활성화를 false를 하면 처음에 query를 실행하게 하지 마라
    enabled: !!searchText
  })

  function fetchMovies() {
    setSearchText(inputText) //비동기
    // 캐시된 것이 잇으면, 캐시 데이터를 써
    // 아니면 새로 가져와!
    // setTImeout보다 좀 더 우선순위를 가지고 실행된다.
    queueMicrotask(() => {
      queryClient.fetchQuery({
        queryKey: ['moves', searchText],
        // 꼭 staletime 시간을 똑같이 맞춰야함.
        staleTime: 1000 * 60 * 60 * 24
      })
    })
  }

  return (
    <>
      <h1>Movies</h1>
      <input
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />

      <button onClick={() => fetchMovies()}>검색</button>
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
