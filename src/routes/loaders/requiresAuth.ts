import { redirect } from 'react-router-dom'
export function requriesAuth({ request }: { request: Request }) {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    const url = new URL(request.url)
    const redirectTo = url.pathname + url.search

    return redirect(`/sign?redirectTo=${encodeURIComponent(redirectTo)}`)
  }
  return true
}
