import { useUpdateTodo, type Todo, useDeleteTodo } from '../../hooks/todos'
import { useState, useRef, useEffect } from 'react'
const TodoItem = ({ todo }: { todo: Todo }) => {
  const { mutateAsync: mutateAsyncForUpdate, isPending: isPendingForUpdate } =
    useUpdateTodo()
  const { mutateAsync: mutateAsyncForDelete, isPending: isPendingForDelete } =
    useDeleteTodo()
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [done, setDone] = useState(todo.done)
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
    await mutateAsyncForUpdate({
      ...todo,
      title
    })
    setIsEditMode(false)
  }
  async function deleteTodo() {
    await mutateAsyncForDelete(todo)
  }

  useEffect(() => {
    mutateAsyncForUpdate({
      ...todo,
      done: done
    })
  }, [done])
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
            disabled={isPendingForUpdate}>
            {isPendingForUpdate ? '저장중...' : '저장'}
          </button>
          <button onClick={cancelEditMode}>취소</button>
          <button
            onClick={deleteTodo}
            disabled={isPendingForDelete}>
            {isPendingForDelete ? '삭제 중...' : '삭제'}
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={done}
            onChange={e => setDone(e.target.checked)}
          />
          {todo.title}
          <button onClick={onEditMode}>수정</button>
        </>
      )}
    </li>
  )
}
export default TodoItem
