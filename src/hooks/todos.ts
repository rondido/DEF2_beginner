import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { create } from 'zustand'

export type Todos = Todo[] // 할 일 목록

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

type FilterStatus = 'all' | 'done' | 'todo'

export const useTodoFiltersStore = create<{
  filterStatus: FilterStatus
  setFilterStatus: (status: FilterStatus) => void
}>(set => {
  return {
    filterStatus: 'all',
    setFilterStatus: status => {
      set({
        filterStatus: status
      })
    }
  }
})

export function useFetchTodos() {
  const filterStatus = useTodoFiltersStore(state => state.filterStatus)
  return useQuery<Todos>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify({
          method: 'GET'
        })
      })
      return (await res).json()
    },
    select: todos => {
      switch (filterStatus) {
        case 'all':
          return todos

        case 'todo':
          return todos.filter(todo => !todo.done)

        case 'done':
          return todos.filter(todo => todo.done)
      }
    }
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify({
          method: 'POST',
          body: JSON.stringify({
            title
          })
        })
      })
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'PUT',
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

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'DELETE'
        }
      )
      return await res.json()
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    }
  })
}

export function useDeleteDoneTodos() {
  const queryClient = useQueryClient()

  const { data: todos } = useFetchTodos() //캐시된 데이터를 가져온다. 새롭게 네트워크를 호출하지 않는다.
  //const todos = queryClient.getQueriesData<Todos>(['toods']) //무조건 캐시된 데이터만 가져오는 것.
  return useMutation({
    mutationFn: async () => {
      const todoIds = todos?.filter(todo => todo.done).map(todo => todo.id)
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/deletions`,
        {
          method: 'DELETE',

          body: JSON.stringify({
            todoIds
          })
        }
      )
      return await res.json()
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    }
  })
}
