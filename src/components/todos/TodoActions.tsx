import { useDeleteDoneTodos } from '../../hooks/todos'

const TodoActions = () => {
  const { mutateAsync, isPending } = useDeleteDoneTodos()
  return (
    <>
      <button
        onClick={() => mutateAsync()}
        disabled={isPending}>
        {isPending ? '삭제 중...' : '완료 삭제'}
      </button>
    </>
  )
}

export default TodoActions
