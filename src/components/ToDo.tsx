import { useEffect, useRef, useState } from "react"
import { type ToDoId, type ToDoType as ToDoType } from "../types"

interface Props extends ToDoType {
  isEditing: string
  setIsEditing: (title: string) => void
  onToggleCompleted: ({ id, completed }: Pick<ToDoType, 'id' | 'completed'>) => void
  onRemoveToDo: ({ id }: ToDoId) => void
  onUpdateToDo: (params: { id: string, title: string }) => void
}
export const ToDo: React.FC<Props> = ({ id, title, completed, isEditing, setIsEditing, onRemoveToDo, onToggleCompleted, onUpdateToDo }) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCompleted({
      id,
      completed: event.target.checked
    })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        onUpdateToDo({ id, title: editedTitle })
      }

      if (editedTitle === '') onRemoveToDo({ id })
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
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
          onClick={() => { onRemoveToDo({ id }) }}
        />
      </div>
      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}