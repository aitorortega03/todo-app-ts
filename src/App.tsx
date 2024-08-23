import { useEffect, useState } from 'react'
import { ToDos } from './components/ToDos'
import { ToDoType, ToDoId, FilterValue, ListOfToDos } from './types'
import { TODO_FILTERS } from './const'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const App: React.FC = () => {
  const [toDos, setToDos] = useState<ListOfToDos>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/aitorortega03/todo-backend/todos')
      .then(res => res.json())
      .then(data => setToDos(data));
  }, []);

  const handleRemove = ({ id }: ToDoId) => {
    const newToDos = toDos.filter(toDo => toDo.id !== id)
    setToDos(newToDos)
    fetch(`https://my-json-server.typicode.com/aitorortega03/todo-backend/todos/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(data => console.log(data))
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
      fetch(`https://my-json-server.typicode.com/aitorortega03/todo-backend/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...toDo,
          completed
        }),
      }).then(respuesta => respuesta.json())
        .then(data => console.log(data))
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
    toDos.forEach(toDo => {
      if (toDo.completed) {
        fetch(`https://my-json-server.typicode.com/aitorortega03/todo-backend/todos/${toDo.id}`, {
          method: 'DELETE',
        }).then(res => res.json())
          .then(data => console.log(data))
      }
    })
  }

  const handleSaveToDo = (title: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setToDos([...toDos, newTodo])
    fetch('https://my-json-server.typicode.com/aitorortega03/todo-backend/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    }).then(res => res.json())
      .then(data => console.log(data))
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = toDos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }
      fetch(`https://my-json-server.typicode.com/aitorortega03/todo-backend/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          title
        }),
      }).then(respuesta => respuesta.json())
        .then(data => console.log(data))

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
