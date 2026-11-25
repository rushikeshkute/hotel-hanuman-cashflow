
import { useCashFlow } from '../../context/CashFlowContext'
import { useLanguage } from '../../context/LanguageContext'
import StatCard from './StatCard'
import './StatsGrid.css'

function StatsGrid() {
  const { sales, expenses, udhar } = useCashFlow()
  const { language } = useLanguage()

  const isMarathi = language === 'Marathi'

  const today = new Date().toISOString().slice(0, 10)

  const todaySales = sales
    .filter((sale) => sale.date === today)
    .reduce((total, sale) => total + sale.amount, 0)

  const todayExpenses = expenses
    .filter((expense) => expense.date === today)
    .reduce((total, expense) => total + expense.amount, 0)

  const netProfit = todaySales - todayExpenses

  const pendingUdhar = udhar.reduce(
    (total, item) => total + (item.amount - item.paid),
    0
  )

  const statsData = [
    {
      title: isMarathi ? 'आजची विक्री' : "Today's Sales",
      amount: `₹${todaySales.toLocaleString('en-IN')}`,
      change: isMarathi ? 'आजचे एकूण उत्पन्न' : 'Total income today',
      icon: '💰',
      color: 'green',
    },
    {
      title: isMarathi ? 'आजचा खर्च' : "Today's Expenses",
      amount: `₹${todayExpenses.toLocaleString('en-IN')}`,
      change: isMarathi ? 'आजचा एकूण खर्च' : 'Total spending today',
      icon: '💸',
      color: 'orange',
    },
    {
      title: isMarathi ? 'निव्वळ शिल्लक' : 'Net Balance',
      amount: `₹${netProfit.toLocaleString('en-IN')}`,
      change: isMarathi ? 'उत्पन्न - खर्च' : 'Income - Expenses',
      icon: '📈',
      color: 'blue',
    },
    {
      title: isMarathi ? 'बाकी उधारी' : 'Pending Udhar',
      amount: `₹${pendingUdhar.toLocaleString('en-IN')}`,
      change: isMarathi ? 'वसूल करायची रक्कम' : 'Amount to collect',
      icon: '📒',
      color: 'pink',
    },
  ]

  return (
    <section className="stats-grid">
      {statsData.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          amount={stat.amount}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </section>
  )
}

export default StatsGrid
