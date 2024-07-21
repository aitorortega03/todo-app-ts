import { FilterValue } from "../types"
import { Filters } from "./Filters"

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  onClearCompleted,
  handleFilterChange
}) => {
  const singleActiveCount = activeCount === 1
  const activeTodoWord = singleActiveCount ? 'tarea' : 'tareas'
  return (
    <footer className="footer">

      <span className="todo-count">
        <strong>{activeCount}</strong> {activeTodoWord} pendiente{!singleActiveCount && 's'}
      </span>

      <Filters filterSelected={filterSelected} handleFilterChange={handleFilterChange} />

      {
        completedCount > 0 &&
        <button
        className="clear-completed"
        onClick={onClearCompleted}>
          Borrar completados
        </button>
      }
    </footer>
  )

}