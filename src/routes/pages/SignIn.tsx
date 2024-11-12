import { useState } from 'react'
export default function SigninPage() {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  function SignIn() {
    console.log(id, password)
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
