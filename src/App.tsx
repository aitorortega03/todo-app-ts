import { useState } from 'react'
import { ToDos } from './components/ToDos'
import { ToDoType, ToDoId, FilterValue } from './types'
import { TODO_FILTERS } from './const'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockTodos = [
  { id: '1', title: 'Aprender React', completed: false },
  { id: '2', title: 'Aprender TypeScript', completed: true },
  { id: '3', title: 'Aprender Vite', completed: false },
]

const App: React.FC = () => {
  const [toDos, setToDos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: ToDoId) => {
    const newToDos = toDos.filter(toDo => toDo.id !== id)
    setToDos(newToDos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleCompleted = ({ id, completed }: Pick<ToDoType, 'id' | 'completed'>) => {
    const newToDos = toDos.map(toDo => {
      if (toDo.id === id) {
        return {
          ...toDo,
          completed
        }
      }
      return toDo
    })
    setToDos(newToDos)
  }

  const activeCount = toDos.filter(toDo => !toDo.completed).length
  const completedCount = toDos.length - toDos.filter(toDo => !toDo.completed).length

  const filteredToDos = toDos.filter(toDo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !toDo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return toDo.completed
    return toDo
  })

  const handleRemoveAllCompleted = (): void => {
    const newToDos = toDos.filter(toDo => !toDo.completed)
    setToDos(newToDos)
  }

  const handleSaveToDo = (title: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setToDos([...toDos, newTodo])
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = toDos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setToDos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Header
      saveTodo={handleSaveToDo}
      />
      <ToDos
        onToggleCompleted={handleCompleted}
        onRemoveToDo={handleRemove}
        onUpdateToDo={handleUpdateTitle}
        toDos={filteredToDos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
