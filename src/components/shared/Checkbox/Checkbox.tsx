import './Checkbox.css'
interface CheckboxProps {
  checked: boolean
  onChange: () => void | undefined
}

export const Checkebox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <div className="checkbox-wrapper">
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="plus-minus"
          checked={checked}
          onChange={onChange}
        />
        <span>Remove</span>
      </label>
    </div>
  )
}
