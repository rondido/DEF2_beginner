import { useUpdateTodo, type Todo } from '../../hooks/todos'
import { useState, useRef } from 'react'
const TodoItem = ({ todo }: { todo: Todo }) => {
  const { mutateAsync, isPending } = useUpdateTodo()
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleWindowEscapeKeyDown(event: KeyboardEvent) {
    event.key === 'Escape' && cancelEditMode()
  }
  function onEditMode() {
    setIsEditMode(true)
    queueMicrotask(() => {
      inputRef.current?.focus()
    })
    window.addEventListener('keydown', handleWindowEscapeKeyDown)
  }
  //이벤트핸들러는 계쏙 메모리에 쌓임. 그래서 지워줘야함.
  function cancelEditMode() {
    setIsEditMode(false)
    setTitle(todo.title)
    window.addEventListener('keydown', handleWindowEscapeKeyDown)
  }
  async function saveTodo() {
    await mutateAsync({
      ...todo,
      title
    })
    setIsEditMode(false)
  }
  return (
    <li>
      {isEditMode ? (
        <>
          <input
            ref={inputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            // onKeyDown={e => e.key === 'Escape' && cancelEditMode()}
          />
          <button
            onChange={saveTodo}
            disabled={isPending}>
            {isPending ? '저장중...' : '저장'}
          </button>
          <button onClick={cancelEditMode}>취소</button>
        </>
      ) : (
        <>
          {todo.title}
          <button onClick={onEditMode}>수정</button>
        </>
      )}
    </li>
  )
}
export default TodoItem
