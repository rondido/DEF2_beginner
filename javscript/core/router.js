//#이 들어있는 것을 해시 모드
//#이 안들어가는 것을 히스토리 모드

function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/') // (상태, 제목, 주소)
  }
  const routerView = document.querySelector('router-view')
  // const [hash] = location.hash.split('?') // 물음표를 기준으로 해시 정보와 쿼리스트링을 구분

  const currentRoute = routes.find(route =>
    new RegExp(`${route.path}/?$`).test(location.hash)
  )
  routerView.innerHTML = ''
  routerView.append(currentRoute.component())
}
export function createRouter(routes) {
  return function () {
    // path이 바뀔때마다 실행
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}
