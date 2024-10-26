// import Button from './Button'

// const message = 'world'

// document.body.innerHTML = /*html*/ `
//   <h1 class="title">${title}</h1>
//   <button class="btn open">열기</button>
//   <button class="btn close">닫기</button>
// `

// const openButton = Button({
//   className: 'open',
//   solt: '열기',

//   onClick: () => {
//     console.log(열기)
//   }
// })
// const closeButton = Button({
//   className: 'open',
//   solt: '닫기',
//   onClick: () => {
//     console.log(닫기)
//   }
// })

// const btn1 = new Button()
// const btn2 = new Button()
// document.body.append(btn1.el, btn2.el)
// // document.body.append(openButton, closeButton)

// // 재사용
// // 캡슐화

import Header from './components/Header'
import router from './routes/index.js'

const headerEl = Header()

document
  .getElementById('app')
  .append(headerEl, document.createElement('router-view'))

router()
