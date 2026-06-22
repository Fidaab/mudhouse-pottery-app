import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  showBack?: boolean
}

export function PageHeader({ title, showBack = true }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="page-header">
      {showBack && (
        <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">
          <ChevronLeft size={22} />
        </button>
      )}
      <h1 className="page-title" style={{ marginBottom: 0 }}>{title}</h1>
    </div>
  )
}
