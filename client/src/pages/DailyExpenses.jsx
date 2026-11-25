
import { useState } from 'react'
import { useCashFlow } from '../context/CashFlowContext'
import { useLanguage } from '../context/LanguageContext'
import './DailyExpenses.css'

function DailyExpenses() {
  const today = new Date().toISOString().slice(0, 10)

  const { expenses, setExpenses } = useCashFlow()
  const { language } = useLanguage()
  const isMarathi = language === 'Marathi'

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(today)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')

  const todayExpenses = expenses
    .filter((expense) => expense.date === today)
    .reduce((total, expense) => total + expense.amount, 0)

  const todayEntries = expenses.filter(
    (expense) => expense.date === today
  ).length

  function handleSubmit(e) {
    e.preventDefault()

    if (
      !title.trim() ||
      !amount ||
      Number(amount) <= 0 ||
      !category ||
      !date
    ) {
      setMessage(
        isMarathi
          ? 'कृपया खर्चाची योग्य माहिती भरा.'
          : 'Please enter valid expense details.'
      )
      return
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
      paymentMethod,
      note: note.trim(),
    }

    setExpenses((previousExpenses) => [
      ...previousExpenses,
      newExpense,
    ])

    setTitle('')
    setAmount('')
    setCategory('')
    setDate(today)
    setPaymentMethod('cash')
    setNote('')
    setMessage(
      isMarathi
        ? 'खर्च यशस्वीरित्या सेव्ह झाला!'
        : 'Expense saved successfully!'
    )
  }

  const categoryLabels = {
    Vegetables: isMarathi ? 'भाजीपाला' : 'Vegetables',
    Grocery: isMarathi ? 'किराणा' : 'Grocery',
    'Milk & Dairy': isMarathi ? 'दूध आणि दुग्धजन्य पदार्थ' : 'Milk & Dairy',
    Gas: isMarathi ? 'गॅस' : 'Gas',
    'Staff Salary': isMarathi ? 'कर्मचारी पगार' : 'Staff Salary',
    Electricity: isMarathi ? 'वीज बिल' : 'Electricity',
    Other: isMarathi ? 'इतर' : 'Other',
  }

  return (
    <div className="expenses-page">
      <div className="expenses-page-header">
        <div>
          <h2>{isMarathi ? 'दैनिक खर्च 💸' : 'Daily Expenses 💸'}</h2>
          <p>
            {isMarathi
              ? 'तुमच्या हॉटेलचा दररोजचा खर्च व्यवस्थापित करा.'
              : "Manage your hotel's daily expenses."}
          </p>
        </div>
        <span>{new Date().toLocaleDateString('en-IN')}</span>
      </div>

      <div className="expenses-summary">
        <div className="expense-summary-card">
          <span>
            {isMarathi ? 'आजचा एकूण खर्च' : "Today's Total Expenses"}
          </span>
          <h2>₹{todayExpenses.toLocaleString('en-IN')}</h2>
          <p>
            {isMarathi ? 'आज खर्च झालेली एकूण रक्कम' : 'Total money spent today'}
          </p>
        </div>

        <div className="expense-summary-card">
          <span>
            {isMarathi ? 'एकूण खर्च नोंदी' : 'Total Expense Entries'}
          </span>
          <h2>{todayEntries.toString().padStart(2, '0')}</h2>
          <p>
            {isMarathi ? 'आज नोंदवलेले खर्च' : 'Expenses recorded today'}
          </p>
        </div>
      </div>

      <div className="expense-form-card">
        <h3>{isMarathi ? '➕ नवीन खर्च जोडा' : '➕ Add New Expense'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="expense-form-grid">
            <div className="expense-field">
              <label>{isMarathi ? 'खर्चाचे नाव' : 'Expense Title'}</label>
              <input
                type="text"
                placeholder={
                  isMarathi ? 'उदा. भाजीपाला, गॅस...' : 'Example: Vegetable, Gas...'
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="expense-field">
              <label>{isMarathi ? 'रक्कम (₹)' : 'Amount (₹)'}</label>
              <input
                type="number"
                min="1"
                placeholder={isMarathi ? 'रक्कम टाका' : 'Enter amount'}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="expense-field">
              <label>{isMarathi ? 'वर्ग' : 'Category'}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  {isMarathi ? 'वर्ग निवडा' : 'Select Category'}
                </option>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="expense-field">
              <label>{isMarathi ? 'खर्चाची तारीख' : 'Expense Date'}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="expense-field full-width">
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

            <div className="expense-field full-width">
              <label>{isMarathi ? 'शेरा (ऐच्छिक)' : 'Note (Optional)'}</label>
              <textarea
                placeholder={
                  isMarathi ? 'अधिक माहिती लिहा...' : 'Enter additional details...'
                }
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="expense-submit-btn">
            {isMarathi ? '+ खर्च सेव्ह करा' : '+ Save Expense'}
          </button>

          {message && <p role="status">{message}</p>}
        </form>
      </div>

      <div className="expense-form-card">
        <h3>{isMarathi ? 'खर्चाच्या नोंदी' : 'Expense Entries'}</h3>

        {expenses.length === 0 ? (
          <p>
            {isMarathi
              ? 'अजून कोणताही खर्च नोंदवलेला नाही.'
              : 'No expense entries added yet.'}
          </p>
        ) : (
          <div className="expense-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>{isMarathi ? 'तारीख' : 'Date'}</th>
                  <th>{isMarathi ? 'नाव' : 'Title'}</th>
                  <th>{isMarathi ? 'वर्ग' : 'Category'}</th>
                  <th>{isMarathi ? 'पेमेंट' : 'Payment'}</th>
                  <th>{isMarathi ? 'रक्कम' : 'Amount'}</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.title}</td>
                    <td>{categoryLabels[expense.category] || expense.category}</td>
                    <td>{expense.paymentMethod.toUpperCase()}</td>
                    <td>₹{expense.amount.toLocaleString('en-IN')}</td>
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

export default DailyExpenses
