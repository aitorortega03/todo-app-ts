export interface ToDoType {
  id: string,
  title: string,
  completed: boolean
}

export type ToDoId = Pick<ToDoType, 'id'>
export type ToDoTitle = Pick<ToDoType, 'title'>
export type ToDoCompleted = Pick<ToDoType, 'completed'>

export type ListOfToDos = ToDoType[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]