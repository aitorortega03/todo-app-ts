import { useState } from 'react'

interface Props {
  saveToDo: (title: string) => void
}

export const CreateToDo: React.FC<Props> = ({ saveToDo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && inputValue !== '') {
      saveToDo(inputValue)
      setInputValue('')
    }
  }

  return (
    <input
      className='new-todo'
      value={inputValue}
      onChange={(e) => { setInputValue(e.target.value) }}
      onKeyDown={handleKeyDown}
      placeholder='¿Qué quieres hacer?'
      autoFocus
    />
  )
}