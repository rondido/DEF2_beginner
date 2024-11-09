import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

// 정적인 페이지 관리
const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/signin', label: 'Sign in' },
  { to: '/movies/tt4154796', label: 'Endgame' }
]

//동적인 페이지 관리

export default function Header() {
  return (
    <header>
      <nav>
        {navigations.map(nav => (
          <NavLink
            to={nav.to}
            key={nav.to}
            className={({ isActive }) => (isActive ? styles.active : '')}>
            {nav.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

//Link도 a
// 페이지가 새로고침 되는 것을 방지한다. 모든 렌더링을 방지..
// 외부 탐색은 a링크
//_blank는 외부 탭으로 이동
//className={({ isActive }) => (isActive ? styles.active : '')} 클릭된 페이지에 대한 색이 변함
//http:12313145/movies/id
// id = 동적
// movie = 정적
