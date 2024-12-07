import { useTodoFiltersStore } from '../../hooks/todos'

const TodoFilters = () => {
  const setfilterStatus = useTodoFiltersStore(state => state.setFilterStatus)
  return (
    <div>
      <button onClick={() => setfilterStatus('all')}>전체</button>
      <button onClick={() => setfilterStatus('todo')}>할 일</button>
      <button onClick={() => setfilterStatus('done')}>완료</button>
    </div>
  )
}

export default TodoFilters
