import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = create(
  combine(
    {
      searchText: '',
      movies: [] as Movie[]
    },
    (set, get) => {
      return {
        async searchMovies() {
          const { searchText } = get()
          const res = await fetch(
            `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
          )
          const { Search } = await res.json()
          set({
            movies: Search
          })
        },

        setSearchText: (text: string) => {
          set({
            searchText: text
          })
        }
      }
    }
  )
)
