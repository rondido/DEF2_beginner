import { useState } from 'react'
import './App.css'

interface Movie {
  Poster: string
  Title: string
  Type: string
  imdbID: string
}

function App() {
  const [message, setMessage] = useState('Hello world!')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isShow, setIsShow] = useState(false)

  function handleClick() {
    setIsShow(!isShow)
    //fetchMovies()
  }

  async function fetchMovies() {
    const res = await fetch('https://omdbapi.com?apikey=7035c60c&s=avengers')
    const data = await res.json()
    return data.Search
  }

  console.log(true && 123 && '0')

  return (
    <>
      {isShow && <h1>{message}</h1>}
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
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
