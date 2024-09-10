import Style from './Buttons.module.css'
import { Loading } from './Loading'

export const StateButton: React.FC<{
  onClick: React.MouseEventHandler<HTMLParagraphElement>
  className?: string
  children: React.ReactNode
  type: 'default' | 'outline' | 'compact' | 'outlineCompact'
  loading?: boolean
}> = ({ onClick, className, children, type, loading }) => {
  const typeClasses = {
    default: Style.button,
    outline: Style.outline,
    compact: Style.compact,
    outlineCompact: Style.outlineCompact,
  }

  if (loading) return <Loading />

  return (
    <p onClick={onClick} className={typeClasses[type] + ' ' + className}>
      {children}
    </p>
  )
}
