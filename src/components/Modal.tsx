import { useNavigate } from 'react-router-dom'
import style from './Modal.module.css'
export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  function offModal() {
    navigate(-1)
  }
  return (
    <div className={style.modal}>
      <div
        className={style.overlay}
        onClick={offModal}></div>
      <div className={style.content}>{children}</div>
    </div>
  )
}
