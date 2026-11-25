
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './QuickActions.css'

function QuickActions() {
  const navigate = useNavigate()
  const { language } = useLanguage()

  const isMarathi = language === 'Marathi'

  const actions = [
    {
      icon: '💰',
      title: isMarathi ? 'दैनिक विक्री जोडा' : 'Add Daily Sales',
      color: 'sales-action',
      path: '/sales',
    },
    {
      icon: '💸',
      title: isMarathi ? 'खर्च जोडा' : 'Add Expense',
      color: 'expense-action',
      path: '/expenses',
    },
    {
      icon: '📒',
      title: isMarathi ? 'उधारी नोंद जोडा' : 'Add Udhar Entry',
      color: 'udhar-action',
      path: '/udhar',
    },
    {
      icon: '📊',
      title: isMarathi ? 'रिपोर्ट पहा' : 'View Reports',
      color: 'report-action',
      path: '/reports',
    },
  ]

  return (
    <section className="quick-panel">
      <div className="quick-heading">
        <h3>{isMarathi ? 'जलद कृती' : 'Quick Actions'}</h3>
        <p>
          {isMarathi
            ? 'तुमची दैनंदिन कामे व्यवस्थापित करा'
            : 'Manage your daily activities'}
        </p>
      </div>

      <div className="quick-actions-list">
        {actions.map((action) => (
          <button
            type="button"
            className={`action-btn ${action.color}`}
            key={action.path}
            onClick={() => navigate(action.path)}
          >
            <span>{action.icon}</span>
            {action.title}
            <span className="action-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuickActions
