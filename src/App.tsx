import React from 'react'

export default function SignIn() {
  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e?.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
  }
  return (
    <form onSubmit={handelSubmit}>
      <input
        type="text"
        name="email"
      />
      <input
        type="password"
        name="password"
      />
      <button type="submit">로그인</button>
    </form>
  )
}
