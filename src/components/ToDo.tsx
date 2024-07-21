import { type ToDoId, type ToDoType as ToDoType } from "../types"

interface Props extends ToDoType {
  onToggleCompleted: ({ id, completed }: Pick<ToDoType, 'id' | 'completed'>) => void
  onRemoveToDo: ({ id }: ToDoId) => void
}
export const ToDo: React.FC<Props> = ({ id, title, completed, onRemoveToDo, onToggleCompleted }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCompleted({
      id,
      completed: event.target.checked
    })
  }
  return (
    <>
    <div className='view'>
      <input
        className='toggle'
        type="checkbox"
        checked={completed}
        onChange={handleChangeCheckbox}
      />
      <label>{title}</label>
      <button
      className="destroy"
      onClick={() => {onRemoveToDo({ id })}}
      />
    </div>
    </>
  )
}