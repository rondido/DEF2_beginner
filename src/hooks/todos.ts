import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

export type Todos = Todo[] // 할 일 목록

const queryClient = useQueryClient()

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

export function useFetchTodos() {
  return useQuery<Todos>({
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
}

export function useCreateTodo() {
  return useMutation({
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
      //낙관적 업데이트
      const todo = {
        id: (Date.now() + Math.random()).toString(),
        title: title
      } as Todo //타입 단언
      const previousTodos = queryClient.getQueryData<Todos>(['todos'])
      // todos?.unshift(todo)
      if (previousTodos) {
        queryClient.setQueryData(['todos'], [todo, ...previousTodos])
      }
      return previousTodos
    },

    onSuccess: (_todo, _title, _previousTodos) => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    },
    onError: (_error, _title, previousTodos) => {
      //되돌리기(복구하기)
      // const todos = queryClient.getQueryData<Todos>(['todos'])
      // todos?.shift()
      queryClient.setQueryData(['todos'], previousTodos)
    },
    onSettled: () => {}
  })
}

export function useUpdateTodo() {
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          },
          body: JSON.stringify({
            title: todo.title,
            done: todo.done
          })
        }
      )
      return await res.json()
    },
    onMutate: () => {},
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    },
    onError: () => {}
  })
}
