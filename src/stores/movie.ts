import { create } from 'zustand'

export const useMovieStore = create(set => {
  return {
    searchText: '',
    movies: [],
    async serarchMovie() {
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      set({
        movies: Search
      })
    }
  }
})
