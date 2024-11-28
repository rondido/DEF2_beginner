import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient
} from '@tanstack/react-query'
import { useState } from 'react'

type Todos = Todo[] // 할 일 목록

interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

const Todos = () => {
  const [title, setTitle] = useState('')

  const queryClient = useQueryClient()
  const { data: todos } = useQuery<Todos>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          }
        }
      )
      return (await res).json()
    }
  })
  const { mutate } = useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          },
          body: JSON.stringify({
            title: title
          })
        }
      )
      return await res.json()
    },
    onMutate: title => {
      const todo = {
        id: (Date.now() + Math.random()).toString(),
        title: title
      } as Todo //타입 단언
      const todos = queryClient.getQueryData<Todos>(['todos'])
      todos?.unshift(todo)
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    },
    onError: () => {},
    onSettled: () => {}
  })
  return (
    <>
      <h1>Todos Page</h1>
      <div>
        <input
          type="text"
          onKeyDown={e =>
            e.key === 'Enter' && !e.nativeEvent.isComposing && mutate(title)
          }
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={() => mutate(title)}>할 일 추가</button>
      </div>
      <ul>{todos?.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
    </>
  )
}

export default Todos
