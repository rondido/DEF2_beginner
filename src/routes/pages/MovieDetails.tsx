import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export interface Movie {
  Actors: string
  Title: string
  Plot: string
}
export default function MovieDetails() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)

  //반응형 데이터 => 데이터가 변경되면, 화면도 변경돼야 하기 때문에!
  async function fetchMovieDetils() {
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&i=${movieId}`)
    const movie = await res.json()
    setMovie(movie)
  }
  useEffect(() => {
    fetchMovieDetils()
  }, [])
  return (
    <>
      <h1>{movie?.Title}</h1>
      <p>{movie?.Plot}</p>
    </>
  )
}
