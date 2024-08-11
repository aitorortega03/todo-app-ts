import { useState } from "react"
import { ToDoId, ToDoType, type ListOfToDos } from "../types"
import { ToDo } from "./ToDo"

interface Props {
  toDos: ListOfToDos
  onToggleCompleted: ({ id, completed }: Pick<ToDoType, 'id' | 'completed'>) => void
  onRemoveToDo: (id: ToDoId) => void
  onUpdateToDo: (params: { id: string, title: string }) => void
}

export const ToDos: React.FC<Props> = ({ toDos, onRemoveToDo, onToggleCompleted, onUpdateToDo }) => {
  const [isEditing, setIsEditing] = useState('')

  return (
    <ul className='todo-list'>
      {toDos.map(toDo => (
        <li
          key={toDo.id}
          onDoubleClick={() => { setIsEditing(toDo.id) }}
          className={`
            ${toDo.completed ? 'completed' : ''}
            ${isEditing === toDo.id ? 'editing' : ''}
          `}>
          <ToDo
            key={toDo.id}
            id={toDo.id}
            title={toDo.title}
            completed={toDo.completed}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onToggleCompleted={onToggleCompleted}
            onRemoveToDo={onRemoveToDo}
            onUpdateToDo={onUpdateToDo}
          />
        </li>
      ))}
    </ul>
  )
}