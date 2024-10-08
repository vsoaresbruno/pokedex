import './Button.css'

interface ButtonProps {
  onClick: () => void | undefined
  disabled?: boolean | undefined
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export const Button = ({
  onClick,
  disabled,
  children,
  variant = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
