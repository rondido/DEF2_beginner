import Logo from './Logo'

export default function Header() {
  const el = document.createElement('header')
  el.innerHTML = /* html*/ `
    
    <ul class="menu">
      <li><a href="#/">Home</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/signin">Sign In</a></li>
    </ul>
  
  `
  // apeend는 맨 뒤에 prepend는 맨 앞에
  el.prepend(Logo())

  return el
}
