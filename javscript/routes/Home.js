import MovieList from '../components/MovieList'
export default function Home() {
  const el = document.createElement('div')
  el.innerHTML = /*html*/ `<h1>
    Home
  </h1>`
  el.append(
    MovieList([
      { id: 1, title: '어벤져스' },
      { id: 2, title: '토르' }
    ]),
    MovieList([
      { id: 3, title: '청춘' },
      { id: 4, title: '30일' }
    ])
  )
  return el
}
