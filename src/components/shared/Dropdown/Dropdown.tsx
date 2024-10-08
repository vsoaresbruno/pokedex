import './Dropdown.css'
import React from 'react'

interface Option {
  value: string
  label: string
}

interface IDropdownProps {
  options: Option[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Dropdown: React.FC<IDropdownProps> = ({ options, onChange }) => {
  return (
    <>
      <select onChange={onChange} className="select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
