import { FILTERS_BUTTONS } from "../const"
import { FilterValue } from "../types"

interface Props {
  filterSelected: FilterValue,
  handleFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, handleFilterChange }) => {
  const handleClick = (filter: FilterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    handleFilterChange(filter)
  }

  return (
    <ul className="filters">
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = key === filterSelected
          const className = isSelected ? 'selected' : ''

          return (
            <li key={key}>
              <a href={href}
                className={className}
                onClick={handleClick(key as FilterValue)}>{literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}