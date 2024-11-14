import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
export default function SigninPage() {
  const [id, setId] = useState<string>('')
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()
  const callbackUrl = searchParams.get('callbackUrl')
  function SignIn() {
    if (id && password) {
      const assessToken = 'abcxy123'
      localStorage.setItem(assessToken, assessToken)
      navigate(callbackUrl || '/')
    }
  }
  return (
    <>
      <div>Signin</div>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={SignIn}>로그인</button>
    </>
  )
}
