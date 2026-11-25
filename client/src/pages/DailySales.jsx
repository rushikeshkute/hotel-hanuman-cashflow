
import { useState } from 'react'
import { useCashFlow } from '../context/CashFlowContext'
import { useLanguage } from '../context/LanguageContext'
import './DailySales.css'

function DailySales() {
  const today = new Date().toISOString().slice(0, 10)

  const { sales, setSales } = useCashFlow()
  const { language } = useLanguage()

  const isMarathi = language === 'Marathi'

  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(today)
  const [description, setDescription] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [message, setMessage] = useState('')

  const todaySales = sales
    .filter((sale) => sale.date === today)
    .reduce((total, sale) => total + sale.amount, 0)

  const todayEntries = sales.filter(
    (sale) => sale.date === today
  ).length

  function handleSubmit(e) {
    e.preventDefault()

    if (!amount || Number(amount) <= 0 || !date || !description.trim()) {
      setMessage(
        isMarathi
          ? 'कृपया विक्रीची योग्य माहिती भरा.'
          : 'Please enter valid sales details.'
      )
      return
    }

    const newSale = {
      id: Date.now(),
      amount: Number(amount),
      date,
      description: description.trim(),
      paymentMethod,
    }

    setSales((previousSales) => [...previousSales, newSale])

    setAmount('')
    setDate(today)
    setDescription('')
    setPaymentMethod('cash')
    setMessage(
      isMarathi
        ? 'विक्रीची नोंद यशस्वीपणे सेव्ह झाली!'
        : 'Sales entry saved successfully!'
    )
  }

  return (
    <div className="sales-page">
      <div className="sales-page-header">
        <div>
          <h2>
            {isMarathi ? 'दैनिक विक्री 💰' : 'Daily Sales 💰'}
          </h2>
          <p>
            {isMarathi
              ? 'तुमच्या हॉटेलचे दैनिक उत्पन्न व्यवस्थापित करा.'
              : "Manage your hotel's daily income."}
          </p>
        </div>

        <span className="sales-date">
          {new Date().toLocaleDateString('en-IN')}
        </span>
      </div>

      <div className="sales-summary">
        <div className="sales-summary-card">
          <span>
            {isMarathi ? 'आजची एकूण विक्री' : "Today's Total Sales"}
          </span>
          <h2>₹{todaySales.toLocaleString('en-IN')}</h2>
          <p>{isMarathi ? 'आजचे उत्पन्न' : "Today's income"}</p>
        </div>

        <div className="sales-summary-card">
          <span>{isMarathi ? 'एकूण नोंदी' : 'Total Entries'}</span>
          <h2>{todayEntries.toString().padStart(2, '0')}</h2>
          <p>
            {isMarathi ? 'आजच्या विक्रीच्या नोंदी' : 'Sales records today'}
          </p>
        </div>
      </div>

      <div className="sales-form-card">
        <h3>
          {isMarathi ? '➕ नवीन विक्री नोंद जोडा' : '➕ Add New Sales Entry'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="sales-form-grid">
            <div className="sales-field">
              <label>{isMarathi ? 'विक्रीची रक्कम (₹)' : 'Sales Amount (₹)'}</label>
              <input
                type="number"
                min="1"
                placeholder={isMarathi ? 'रक्कम टाका' : 'Enter amount'}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="sales-field">
              <label>{isMarathi ? 'विक्रीची तारीख' : 'Sales Date'}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="sales-field full-width">
              <label>{isMarathi ? 'तपशील' : 'Description'}</label>
              <input
                type="text"
                placeholder={
                  isMarathi
                    ? 'उदा. मिसळ, चहा, नाश्ता...'
                    : 'Example: Misal, Tea, Snacks...'
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="sales-field full-width">
              <label>{isMarathi ? 'पेमेंट पद्धत' : 'Payment Method'}</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">{isMarathi ? 'रोख' : 'Cash'}</option>
                <option value="upi">UPI</option>
                <option value="card">{isMarathi ? 'कार्ड' : 'Card'}</option>
              </select>
            </div>
          </div>

          <button type="submit" className="sales-submit-btn">
            + {isMarathi ? 'विक्री नोंद सेव्ह करा' : 'Save Sales Entry'}
          </button>

          {message && <p role="status">{message}</p>}
        </form>
      </div>

      <div className="sales-form-card">
        <h3>{isMarathi ? 'विक्रीच्या नोंदी' : 'Sales Entries'}</h3>

        {sales.length === 0 ? (
          <p>
            {isMarathi
              ? 'अद्याप विक्रीची नोंद जोडलेली नाही.'
              : 'No sales entries added yet.'}
          </p>
        ) : (
          <div className="sales-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>{isMarathi ? 'तारीख' : 'Date'}</th>
                  <th>{isMarathi ? 'तपशील' : 'Description'}</th>
                  <th>{isMarathi ? 'पेमेंट' : 'Payment'}</th>
                  <th>{isMarathi ? 'रक्कम' : 'Amount'}</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.date}</td>
                    <td>{sale.description}</td>
                    <td>
                      {sale.paymentMethod === 'cash'
                        ? (isMarathi ? 'रोख' : 'CASH')
                        : sale.paymentMethod.toUpperCase()}
                    </td>
                    <td>₹{sale.amount.toLocaleString('en-IN')}</td>
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

export default DailySales
