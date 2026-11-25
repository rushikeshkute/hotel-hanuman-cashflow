
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { useCashFlow } from '../../context/CashFlowContext'
import { useLanguage } from '../../context/LanguageContext'
import './WeeklyOverview.css'

function WeeklyOverview() {
  const { sales, expenses } = useCashFlow()
  const { language } = useLanguage()

  const isMarathi = language === 'Marathi'

  const marathiDays = {
    Sun: 'रवि',
    Mon: 'सोम',
    Tue: 'मंगळ',
    Wed: 'बुध',
    Thu: 'गुरु',
    Fri: 'शुक्र',
    Sat: 'शनि',
  }

  const weeklyData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - index))

    const dateString = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-')

    const englishDay = date.toLocaleDateString('en-IN', {
      weekday: 'short',
    })

    const dayName = isMarathi
      ? marathiDays[englishDay]
      : englishDay

    const dailySales = sales
      .filter((item) => item.date === dateString)
      .reduce((total, item) => total + Number(item.amount || 0), 0)

    const dailyExpenses = expenses
      .filter((item) => item.date === dateString)
      .reduce((total, item) => total + Number(item.amount || 0), 0)

    return {
      day: dayName,
      sales: dailySales,
      expenses: dailyExpenses,
    }
  })

  return (
    <section className="weekly-panel">
      <div className="weekly-heading">
        <div>
          <h3>
            {isMarathi ? 'साप्ताहिक आढावा' : 'Weekly Overview'}
          </h3>
          <p>
            {isMarathi
              ? 'मागील ७ दिवसांची विक्री आणि खर्च'
              : 'Last 7 days sales and expenses'}
          </p>
        </div>
      </div>

      <div className="weekly-chart">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={weeklyData}
            margin={{ top: 15, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
            />

            <Legend />

            <Bar
              dataKey="sales"
              name={isMarathi ? 'विक्री' : 'Sales'}
              fill="#5b83ed"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name={isMarathi ? 'खर्च' : 'Expenses'}
              fill="#ffad61"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default WeeklyOverview
