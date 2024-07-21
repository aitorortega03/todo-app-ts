import { ToDoId, ToDoType, type ListOfToDos } from "../types"
import { ToDo } from "./ToDo"

interface Props {
  todos: ListOfToDos
  onToggleCompleted: ({ id, completed }: Pick<ToDoType, 'id' | 'completed'>) => void
  onRemoveToDo: (id: ToDoId) => void
}

export const ToDos: React.FC<Props> = ({ todos, onRemoveToDo, onToggleCompleted }) => {

  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <li
          key={todo.id}
          className={todo.completed ? 'completed' : ''}>
          <ToDo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggleCompleted={onToggleCompleted}
            onRemoveToDo={onRemoveToDo}
          />
        </li>
      ))}
    </ul>
  )
}