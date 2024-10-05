import { useState } from 'react'

interface Movie {
  Poster: string
  Title: string
  Type: string
  imdbID: string
}

function App() {
  const [message, setMessage] = useState('Hello world!')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isRed, setIsRed] = useState(false)

  function handleClick() {
    setMessage('Good Moring') //재할당
    fetchMovies()
  }

  async function fetchMovies() {
    const res = await fetch('https://omdbapi.com?apikey=7035c60c&s=avengers')
    const data = await res.json()
    setMovies(data.Search)
  }

  return (
    <>
      <h1 className={isRed ? 'active' : ''}>{message}</h1>
      <button onClick={handleClick}>클릭!</button>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              width={50}
            />
            {movie.Title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
