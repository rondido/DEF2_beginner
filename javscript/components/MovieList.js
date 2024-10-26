// export default function MovieList(movies) {
//   const el = document.createElement('div')
//   const liMovieValue = movies
//     .map(movie => {
//       return `<li>${movie.title}</li>`
//     })
//     .join('')
//   console.log(liMovieValue)
//   return el
// }

export default function MovieList(movies) {
  const el = document.createElement('div')
  const liEls = movies.map(movie => {
    const liEl = document.createElement('li')
    liEl.textContent = movie.title
    liEl.addEventListener('click', () => {
      console.log(movie.title)
    })
    return liEl
  })
  el.append(...liEls)
  return el
}
