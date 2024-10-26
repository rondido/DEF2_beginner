import { createRouter } from '../core/router.js'
import Home from './Home.js'
import About from './About.js'
import Signin from './Signin.js'

export default createRouter([
  // 라우트
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/Signin',
    component: Signin
  }
])
