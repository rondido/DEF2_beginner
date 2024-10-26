export default function Signin() {
  const el = document.createElement('div')
  el.innerHTML = /*html*/ `<h1>
    Sign in
  </h1>
  <form>
    <input type="email" name="email" placeholder="이메일을 입력하세요.">
    <input type="epassword" name="password" placeholder="비밀번호를 입력하세요.">
    <button type="submit">로그인</button>

  </form>
  `
  const formEl = el.querySelector('form')
  formEl.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new formData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    //서버 전송 코드는 여기에
  })
  return el
}
