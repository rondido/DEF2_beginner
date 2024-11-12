import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Not Found</h1>
      <button onClick={() => navigate('/')}>홈으로 가자</button>
    </>
  )
}
