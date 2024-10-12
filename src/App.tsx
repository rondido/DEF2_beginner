import { useState, useRef, useEffect } from 'react'
import './App.css'

interface Movie {
  Poster: string
  Title: string
  Type: string
  imdbID: string
}

function App() {
  const [title, setTitle] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isShow, setIsShow] = useState(false)

  const inputEl = useRef<HTMLInputElement | null>(null)

  async function handleClick() {
    // setIsShow(!isShow)
    const movies = await fetchMovies(title)
    setMovies(movies)
  }

  async function fetchMovies(title: string) {
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&s=${title}`)
    const data = await res.json()
    return data.Search
  }

  async function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // mac에서 cjk 즉 중국어 한국어 일본어를 사용하면 api나 log가 2번 호출되는 것을 방지할 수 있다.
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      const movies = await fetchMovies(title)
      setMovies(movies)
    }
  }

  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  return (
    <>
      {isShow && <h1>{title}</h1>}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputEl}
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
