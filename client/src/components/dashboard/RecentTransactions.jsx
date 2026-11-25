
import { useNavigate } from 'react-router-dom'
import { useCashFlow } from '../../context/CashFlowContext'
import { useLanguage } from '../../context/LanguageContext'
import './RecentTransactions.css'

function RecentTransactions() {
  const { sales, expenses, udharPayments } = useCashFlow()
  const { language } = useLanguage()
  const navigate = useNavigate()

  const isMarathi = language === 'Marathi'

  const transactions = [
    ...sales.map((item) => ({
      id: `sale-${item.id}`,
      name: item.description || (isMarathi ? 'दैनिक विक्री' : 'Daily Sales'),
      category: isMarathi ? 'दैनिक विक्री' : 'Daily Sales',
      date: item.date,
      amount: item.amount,
      type: 'income',
      icon: '💰',
    })),

    ...expenses.map((item) => ({
      id: `expense-${item.id}`,
      name: item.title,
      category: item.category,
      date: item.date,
      amount: item.amount,
      type: 'expense',
      icon: '💸',
    })),

    ...udharPayments.map((item) => ({
      id: `udhar-${item.id}`,
      name: `${isMarathi ? 'उधारी जमा' : 'Udhar Payment'} - ${item.customerName}`,
      category: isMarathi ? 'उधारी वसुली' : 'Udhar Received',
      date: item.date,
      amount: item.amount,
      type: 'income',
      icon: '📒',
    })),
  ].sort((a, b) => b.id.localeCompare(a.id))

  const recentTransactions = transactions.slice(0, 5)

  return (
    <section className="transactions-panel">
      <div className="transactions-heading">
        <div>
          <h3>
            {isMarathi ? 'अलीकडील व्यवहार' : 'Recent Transactions'}
          </h3>
          <p>
            {isMarathi
              ? 'तुमच्या हॉटेलमधील अलीकडील व्यवहार'
              : 'Your latest hotel transactions'}
          </p>
        </div>

        <button
          type="button"
          className="view-all-btn"
          onClick={() => navigate('/cashbook')}
        >
          {isMarathi ? 'सर्व पहा' : 'View All'} →
        </button>
      </div>

      <div className="transaction-list">
        {recentTransactions.length === 0 ? (
          <p>
            {isMarathi
              ? 'व्यवहार सापडले नाहीत. पहिली नोंद जोडा!'
              : 'No transactions found. Add your first entry!'}
          </p>
        ) : (
          recentTransactions.map((item) => (
            <div className="transaction-row" key={item.id}>
              <div className={`transaction-icon ${item.type}`}>
                {item.icon}
              </div>

              <div className="transaction-info">
                <strong>{item.name}</strong>
                <small>
                  {item.category} • {item.date}
                </small>
              </div>

              <strong className={`transaction-amount ${item.type}`}>
                {item.type === 'income' ? '+' : '-'} ₹
                {item.amount.toLocaleString('en-IN')}
              </strong>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default RecentTransactions
