import { useState } from 'react'
import TodoItem from '../../components/todos/TodoItem'
import { useCreateTodo, useFetchTodos } from '../../hooks/todos'

const Todos = () => {
  const [title, setTitle] = useState('')

  const { data: todos } = useFetchTodos()
  const { error, mutate, isPending, mutateAsync } = useCreateTodo()

  async function createTodo(title: string) {
    await mutateAsync(title)
    //에러가 없으면 초기화
    if (!error) {
      setTitle('')
    }
  }
  return (
    <>
      <h1>Todos Page</h1>
      <div>
        <input
          type="text"
          onKeyDown={e =>
            e.key === 'Enter' && !e.nativeEvent.isComposing && createTodo(title)
          }
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={() => createTodo(title)}>
          {isPending ? '로딩' : '할일 추가'}
        </button>
      </div>
      <ul>
        {todos?.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </>
  )
}

export default Todos
