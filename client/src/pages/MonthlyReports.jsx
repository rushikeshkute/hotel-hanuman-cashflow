
import { useState } from 'react'
import { useCashFlow } from '../context/CashFlowContext'
import { useLanguage } from '../context/LanguageContext'
import './MonthlyReports.css'

function MonthlyReports() {
  const { sales, expenses, udhar } = useCashFlow()
  const { language } = useLanguage()
  const isMarathi = language === 'Marathi'

  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear())
  )

  const formatAmount = (amount) =>
    `₹${Number(amount).toLocaleString('en-IN')}`

  const isSelectedYear = (date) =>
    date && date.startsWith(`${selectedYear}-`)

  const totalSales = sales
    .filter((item) => isSelectedYear(item.date))
    .reduce((total, item) => total + Number(item.amount || 0), 0)

  const totalExpenses = expenses
    .filter((item) => isSelectedYear(item.date))
    .reduce((total, item) => total + Number(item.amount || 0), 0)

  const netProfit = totalSales - totalExpenses

  const pendingUdhar = udhar.reduce(
    (total, item) =>
      total + Math.max(0, Number(item.amount || 0) - Number(item.paid || 0)),
    0
  )

  const marathiMonths = [
    'जानेवारी',
    'फेब्रुवारी',
    'मार्च',
    'एप्रिल',
    'मे',
    'जून',
    'जुलै',
    'ऑगस्ट',
    'सप्टेंबर',
    'ऑक्टोबर',
    'नोव्हेंबर',
    'डिसेंबर',
  ]

  const reportData = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = String(index + 1).padStart(2, '0')

    const monthlySales = sales
      .filter(
        (item) =>
          item.date?.startsWith(`${selectedYear}-${monthNumber}`)
      )
      .reduce((total, item) => total + Number(item.amount || 0), 0)

    const monthlyExpenses = expenses
      .filter(
        (item) =>
          item.date?.startsWith(`${selectedYear}-${monthNumber}`)
      )
      .reduce((total, item) => total + Number(item.amount || 0), 0)

    return {
      month: isMarathi
        ? marathiMonths[index]
        : new Date(Number(selectedYear), index).toLocaleDateString(
            'en-IN',
            { month: 'long' }
          ),
      sales: monthlySales,
      expenses: monthlyExpenses,
    }
  })

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h2>
            {isMarathi ? 'मासिक रिपोर्ट 📈' : 'Monthly Reports 📈'}
          </h2>
          <p>
            {isMarathi
              ? 'तुमच्या हॉटेलच्या आर्थिक कामगिरीचे विश्लेषण करा.'
              : "Analyze your hotel's financial performance."}
          </p>
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Array.from(
            { length: 5 },
            (_, index) => new Date().getFullYear() - index
          ).map((year) => (
            <option key={year} value={String(year)}>
              {isMarathi ? 'वर्ष' : 'Year'} {year}
            </option>
          ))}
        </select>
      </div>

      <div className="reports-summary">
        <div className="report-card sales-report">
          <span>{isMarathi ? 'एकूण विक्री' : 'Total Sales'}</span>
          <h2>{formatAmount(totalSales)}</h2>
          <p>
            {isMarathi ? 'निवडलेल्या वर्षातील विक्री' : 'Selected year sales'}
          </p>
        </div>

        <div className="report-card expenses-report">
          <span>{isMarathi ? 'एकूण खर्च' : 'Total Expenses'}</span>
          <h2>{formatAmount(totalExpenses)}</h2>
          <p>
            {isMarathi ? 'निवडलेल्या वर्षातील खर्च' : 'Selected year expenses'}
          </p>
        </div>

        <div className="report-card profit-report">
          <span>{isMarathi ? 'निव्वळ नफा' : 'Net Profit'}</span>
          <h2>{formatAmount(netProfit)}</h2>
          <p>
            {isMarathi ? 'विक्री वजा खर्च' : 'Sales minus expenses'}
          </p>
        </div>

        <div className="report-card udhar-report">
          <span>{isMarathi ? 'बाकी उधारी' : 'Pending Udhar'}</span>
          <h2>{formatAmount(pendingUdhar)}</h2>
          <p>
            {isMarathi
              ? 'सर्व ग्राहकांची बाकी रक्कम'
              : 'All customers pending balance'}
          </p>
        </div>
      </div>

      <div className="reports-table-card">
        <h3>
          {isMarathi ? 'मासिक कामगिरी' : 'Monthly Performance'} — {selectedYear}
        </h3>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>{isMarathi ? 'महिना' : 'Month'}</th>
                <th>{isMarathi ? 'विक्री' : 'Sales'}</th>
                <th>{isMarathi ? 'खर्च' : 'Expenses'}</th>
                <th>{isMarathi ? 'निव्वळ नफा' : 'Net Profit'}</th>
              </tr>
            </thead>

            <tbody>
              {reportData.map((item) => (
                <tr key={item.month}>
                  <td>{item.month}</td>

                  <td className="report-sales">
                    {formatAmount(item.sales)}
                  </td>

                  <td className="report-expenses">
                    {formatAmount(item.expenses)}
                  </td>

                  <td className="report-profit">
                    {formatAmount(item.sales - item.expenses)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MonthlyReports
