let name = ''
function a() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(1)
      name = 'Neo'
      resolve(123)
    }, 1000)
  })
}

function b() {
  return 123
}

console.log(b())
;(async function () {
  const res = a()
  console.log('완료!', await res)
})()

const instance = new Array(1, 2, 3)
console.log(instance) //완료! 123 resolve에 123을 넣어서 그렇고 넣지 않으면 undefined로 나옴

async function fetchMovies1() {
  const res = await fetch('...')
  const { Search } = await res.json()
  console.log(Search)
}

function wait(ms = 1000) {
  return new Promise(resolve, reject => {
    if (ms > 10000) {
      return reject(new Error('시간 초과'))
    }
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

async function fetchMovies1() {
  const loadingEl = document.createElement('div')
  loadingEl.textContent = '로딩중...'
  document.body.append(loadingEl)
  await wait(2000)
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
  const res = fetch('...')
  const promise = (await res).json()
  const { Search } = await promise
  loadingEl.remove()
  return Search
}

fetchMovies()

function renderMovies(movies) {
  const moviesEl = document.createElement('ul')
  movies.forEach(element => {
    const movieEl = document.createElement('li')
    movieEl.textContent = movie.Title
    movieEl.append(movieEl)
  })
  document.body.append(moviesEl)
}

// function b() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(2)
//       console.log(name)
//       resolve()
//     }, 500)
//   })
// }

// function c() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(3)
//       resolve()
//     }, 1000)
//   })
// }

// function d() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(4)
//       resolve()
//     }, 100)
//   })
// }

// await a()
// await b()
// await c()
// await d()

setTimeout(() => {
  console.log('time')
})

new Promise(resolve => {
  console.log('promise')
  resolve()
})

// promise 다음 time 실행
