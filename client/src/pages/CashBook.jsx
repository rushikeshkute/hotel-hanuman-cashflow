
import { useState } from 'react'
import { useCashFlow } from '../context/CashFlowContext'
import { useLanguage } from '../context/LanguageContext'
import './CashBook.css'

function CashBook() {
  const today = new Date().toISOString().slice(0, 10)

  const { sales, expenses, udharPayments } = useCashFlow()
  const { language } = useLanguage()
  const isMarathi = language === 'Marathi'

  const [selectedDate, setSelectedDate] = useState(today)

  const dailySales = sales.filter(
    (sale) => sale.date === selectedDate
  )

  const dailyExpenses = expenses.filter(
    (expense) => expense.date === selectedDate
  )

  const dailyUdharPayments = udharPayments.filter(
    (payment) => payment.date === selectedDate
  )

  const totalSales = dailySales.reduce(
    (total, sale) => total + sale.amount,
    0
  )

  const totalUdharReceived = dailyUdharPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  )

  const totalIncome = totalSales + totalUdharReceived

  const totalExpenses = dailyExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )

  const balance = totalIncome - totalExpenses

  const transactions = [
    ...dailySales.map((sale) => ({
      id: `sale-${sale.id}`,
      title: sale.description,
      category: 'Daily Sales',
      date: sale.date,
      amount: sale.amount,
      type: 'income',
      paymentMethod: sale.paymentMethod || 'cash',
    })),

    ...dailyUdharPayments.map((payment) => ({
      id: `udhar-${payment.id}`,
      title: `Udhar Payment - ${payment.customerName}`,
      category: 'Udhar Received',
      date: payment.date,
      amount: Number(payment.amount),
      type: 'income',
      paymentMethod: payment.paymentMethod || 'cash',
    })),

    ...dailyExpenses.map((expense) => ({
      id: `expense-${expense.id}`,
      title: expense.title,
      category: expense.category,
      date: expense.date,
      amount: expense.amount,
      type: 'expense',
      paymentMethod: expense.paymentMethod || 'cash',
    })),
  ].sort((a, b) => b.id.localeCompare(a.id))

  const getPaymentBalance = (method) => {
    const income = transactions
      .filter(
        (item) =>
          item.type === 'income' &&
          item.paymentMethod === method
      )
      .reduce((total, item) => total + Number(item.amount), 0)

    const expense = transactions
      .filter(
        (item) =>
          item.type === 'expense' &&
          item.paymentMethod === method
      )
      .reduce((total, item) => total + Number(item.amount), 0)

    return income - expense
  }

  const cashBalance = getPaymentBalance('cash')
  const upiBalance = getPaymentBalance('upi')
  const onlineBalance = getPaymentBalance('online')

  const categoryLabels = {
    'Daily Sales': isMarathi ? 'दैनिक विक्री' : 'Daily Sales',
    'Udhar Received': isMarathi ? 'उधारी प्राप्त' : 'Udhar Received',
    Vegetables: isMarathi ? 'भाजीपाला' : 'Vegetables',
    Grocery: isMarathi ? 'किराणा' : 'Grocery',
    'Milk & Dairy': isMarathi ? 'दूध आणि दुग्धजन्य पदार्थ' : 'Milk & Dairy',
    Gas: isMarathi ? 'गॅस' : 'Gas',
    'Staff Salary': isMarathi ? 'कर्मचारी पगार' : 'Staff Salary',
    Electricity: isMarathi ? 'वीज बिल' : 'Electricity',
    Other: isMarathi ? 'इतर' : 'Other',
  }

  return (
    <div className="cashbook-page">
      <div className="cashbook-header">
        <div>
          <h2>{isMarathi ? 'रोकड वही 📖' : 'Cash Book 📖'}</h2>
          <p>
            {isMarathi
              ? 'हॉटेलचे सर्व उत्पन्न आणि खर्च तपासा.'
              : 'Track all your hotel income and expenses.'}
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="cashbook-summary">
        <div className="cashbook-card income-card">
          <span>{isMarathi ? 'एकूण उत्पन्न' : 'Total Income'}</span>
          <h2>₹{totalIncome.toLocaleString('en-IN')}</h2>
          <p>{isMarathi ? 'विक्री + उधारी प्राप्त' : 'Sales + Udhar Received'}</p>
        </div>

        <div className="cashbook-card expense-card">
          <span>{isMarathi ? 'एकूण खर्च' : 'Total Expenses'}</span>
          <h2>₹{totalExpenses.toLocaleString('en-IN')}</h2>
          <p>{isMarathi ? 'एकूण खर्च झालेली रक्कम' : 'Money spent'}</p>
        </div>

        <div className="cashbook-card balance-card">
          <span>{isMarathi ? 'निव्वळ शिल्लक' : 'Net Balance'}</span>
          <h2>₹{balance.toLocaleString('en-IN')}</h2>
          <p>{isMarathi ? 'उत्पन्न - खर्च' : 'Income - Expenses'}</p>
        </div>

        <div className="cashbook-card">
          <span>{isMarathi ? 'रोख शिल्लक 💵' : 'Cash Balance 💵'}</span>
          <h2>₹{cashBalance.toLocaleString('en-IN')}</h2>
          <p>
            {isMarathi
              ? 'रोख उत्पन्न - रोख खर्च'
              : 'Cash income - Cash expenses'}
          </p>
        </div>

        <div className="cashbook-card">
          <span>UPI {isMarathi ? 'शिल्लक 📱' : 'Balance 📱'}</span>
          <h2>₹{upiBalance.toLocaleString('en-IN')}</h2>
          <p>
            {isMarathi
              ? 'UPI उत्पन्न - UPI खर्च'
              : 'UPI income - UPI expenses'}
          </p>
        </div>

        <div className="cashbook-card">
          <span>{isMarathi ? 'ऑनलाइन शिल्लक 🌐' : 'Online Balance 🌐'}</span>
          <h2>₹{onlineBalance.toLocaleString('en-IN')}</h2>
          <p>
            {isMarathi
              ? 'ऑनलाइन उत्पन्न - ऑनलाइन खर्च'
              : 'Online income - Online expenses'}
          </p>
        </div>
      </div>

      <div className="cashbook-table-card">
        <h3>{isMarathi ? 'व्यवहार इतिहास' : 'Transaction History'}</h3>

        {transactions.length === 0 ? (
          <p>
            {isMarathi
              ? 'या तारखेसाठी कोणतेही व्यवहार सापडले नाहीत.'
              : 'No transactions found for this date.'}
          </p>
        ) : (
          <div className="cashbook-table-wrap">
            <table className="cashbook-table">
              <thead>
                <tr>
                  <th>{isMarathi ? 'व्यवहार' : 'Transaction'}</th>
                  <th>{isMarathi ? 'वर्ग' : 'Category'}</th>
                  <th>{isMarathi ? 'तारीख' : 'Date'}</th>
                  <th>{isMarathi ? 'पेमेंट' : 'Payment'}</th>
                  <th>{isMarathi ? 'रक्कम' : 'Amount'}</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.category === 'Udhar Received'
                        ? `${isMarathi ? 'उधारी पेमेंट' : 'Udhar Payment'} - ${item.title.split(' - ').slice(1).join(' - ')}`
                        : item.title}
                    </td>
                    <td>{categoryLabels[item.category] || item.category}</td>
                    <td>{item.date}</td>
                    <td>{(item.paymentMethod || 'cash').toUpperCase()}</td>
                    <td className={item.type}>
                      {item.type === 'income' ? '+' : '-'} ₹
                      {item.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default CashBook
