import './Textarea.css'

interface ITextareaProps {
  value: string | undefined
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

export const Textarea: React.FC<ITextareaProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <textarea
      className="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
