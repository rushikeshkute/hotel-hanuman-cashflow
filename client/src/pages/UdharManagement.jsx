
import { useState } from 'react'
import { useCashFlow } from '../context/CashFlowContext'
import { useLanguage } from '../context/LanguageContext'
import './UdharManagement.css'

function UdharManagement() {
    const { udhar, setUdhar, udharPayments, setUdharPayments } = useCashFlow()
    const { language } = useLanguage()
    const isMarathi = language === 'Marathi'

    const today = new Date().toISOString().slice(0, 10)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(today)
    const [note, setNote] = useState('')
    const [message, setMessage] = useState('')

    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [paymentAmount, setPaymentAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('cash')

    const totalUdhar = udhar.reduce(
        (total, item) => total + item.amount,
        0
    )

    const totalPaid = udhar.reduce(
        (total, item) => total + item.paid,
        0
    )

    const pendingAmount = totalUdhar - totalPaid

    function handleSubmit(e) {
        e.preventDefault()

        if (
            !name.trim() ||
            !phone.trim() ||
            !/^\d{10}$/.test(phone) ||
            !amount ||
            Number(amount) <= 0 ||
            !date
        ) {
            setMessage(
                isMarathi
                    ? 'कृपया ग्राहकाची योग्य माहिती भरा.'
                    : 'Please enter valid customer details.'
            )
            return
        }

        const newUdhar = {
            id: Date.now(),
            name: name.trim(),
            phone: phone.trim(),
            amount: Number(amount),
            paid: 0,
            date,
            note: note.trim(),
        }

        setUdhar((previous) => [...previous, newUdhar])

        setName('')
        setPhone('')
        setAmount('')
        setDate(today)
        setNote('')
        setMessage(
            isMarathi
                ? 'उधारीची नोंद यशस्वीरित्या सेव्ह झाली!'
                : 'Udhar entry saved successfully!'
        )
    }

    function handlePayment(e) {
        e.preventDefault()

        const customer = udhar.find(
            (item) => item.id === selectedCustomer
        )

        const payment = Number(paymentAmount)

        if (!customer || !paymentAmount || payment <= 0) {
            setMessage(
                isMarathi
                    ? 'कृपया योग्य पेमेंट रक्कम भरा.'
                    : 'Please enter a valid payment amount.'
            )
            return
        }

        const remaining = customer.amount - customer.paid

        if (payment > remaining) {
            setMessage(
                isMarathi
                    ? `पेमेंटची रक्कम बाकी रकमेपेक्षा जास्त असू शकत नाही. बाकी रक्कम ₹${remaining.toLocaleString('en-IN')}.`
                    : `Payment cannot exceed pending amount ₹${remaining.toLocaleString('en-IN')}.`
            )
            return
        }

        setUdhar((previous) =>
            previous.map((item) =>
                item.id === selectedCustomer
                    ? { ...item, paid: item.paid + payment }
                    : item
            )
        )

        const newPayment = {
            id: Date.now(),
            customerId: customer.id,
            customerName: customer.name,
            amount: payment,
            date: today,
            paymentMethod: paymentMethod,
        }

        setUdharPayments((previous) => [...previous, newPayment])

        setSelectedCustomer(null)
        setPaymentAmount('')
        setMessage(
            isMarathi
                ? 'पेमेंट यशस्वीरित्या प्राप्त झाले!'
                : 'Payment received successfully!'
        )
    }

    return (
        <div className="udhar-page">
            <div className="udhar-header">
                <div>
                    <h2>
                        {isMarathi ? 'उधारी व्यवस्थापन 📒' : 'Udhar Management 📒'}
                    </h2>
                    <p>
                        {isMarathi
                            ? 'ग्राहकांची उधारी आणि बाकी पेमेंट व्यवस्थापित करा.'
                            : 'Manage customer credit and pending payments.'}
                    </p>
                </div>
            </div>

            <div className="udhar-summary">
                <div className="udhar-card">
                    <span>{isMarathi ? 'एकूण उधारी' : 'Total Udhar'}</span>
                    <h2>₹{totalUdhar.toLocaleString('en-IN')}</h2>
                    <p>{isMarathi ? 'एकूण उधारीची रक्कम' : 'Total credit amount'}</p>
                </div>

                <div className="udhar-card">
                    <span>{isMarathi ? 'प्राप्त पेमेंट' : 'Received Payment'}</span>
                    <h2>₹{totalPaid.toLocaleString('en-IN')}</h2>
                    <p>{isMarathi ? 'प्राप्त झालेली रक्कम' : 'Amount received'}</p>
                </div>

                <div className="udhar-card">
                    <span>{isMarathi ? 'बाकी रक्कम' : 'Pending Amount'}</span>
                    <h2>₹{pendingAmount.toLocaleString('en-IN')}</h2>
                    <p>{isMarathi ? 'वसूल करायची रक्कम' : 'Amount to collect'}</p>
                </div>
            </div>

            <div className="udhar-form-card">
                <h3>
                    {isMarathi ? '➕ ग्राहकाची उधारी जोडा' : '➕ Add Customer Udhar'}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="udhar-form-grid">
                        <div className="udhar-field">
                            <label>{isMarathi ? 'ग्राहकाचे नाव' : 'Customer Name'}</label>
                            <input
                                type="text"
                                placeholder={isMarathi ? 'ग्राहकाचे नाव टाका' : 'Enter customer name'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="udhar-field">
                            <label>{isMarathi ? 'मोबाईल नंबर' : 'Mobile Number'}</label>
                            <input
                                type="tel"
                                placeholder={isMarathi ? '१० अंकी मोबाईल नंबर टाका' : 'Enter 10 digit mobile number'}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={10}
                            />
                        </div>

                        <div className="udhar-field">
                            <label>{isMarathi ? 'उधारीची रक्कम (₹)' : 'Udhar Amount (₹)'}</label>
                            <input
                                type="number"
                                placeholder={isMarathi ? 'रक्कम टाका' : 'Enter amount'}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="1"
                            />
                        </div>

                        <div className="udhar-field">
                            <label>{isMarathi ? 'तारीख' : 'Date'}</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="udhar-field full-width">
                            <label>{isMarathi ? 'शेरा' : 'Note'}</label>
                            <input
                                type="text"
                                placeholder={isMarathi ? 'अतिरिक्त माहिती (ऐच्छिक)...' : 'Optional details...'}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>

                        <div className="udhar-field">
                            <label>{isMarathi ? 'पेमेंट पद्धत' : 'Payment Method'}</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="cash">{isMarathi ? 'रोख' : 'Cash'}</option>
                                <option value="upi">UPI</option>
                                <option value="online">{isMarathi ? 'ऑनलाइन' : 'Online'}</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="udhar-submit-btn">
                        {isMarathi ? '+ उधारी सेव्ह करा' : '+ Save Udhar Entry'}
                    </button>
                </form>
            </div>

            {selectedCustomer !== null && (
                <div className="udhar-form-card">
                    <h3>
                        {isMarathi ? '💵 ग्राहकाचे पेमेंट स्वीकारा' : '💵 Receive Customer Payment'}
                    </h3>

                    <form onSubmit={handlePayment}>
                        <div className="udhar-field">
                            <label>{isMarathi ? 'पेमेंटची रक्कम (₹)' : 'Payment Amount (₹)'}</label>
                            <input
                                type="number"
                                min="1"
                                placeholder={isMarathi ? 'प्राप्त रक्कम टाका' : 'Enter received amount'}
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="udhar-submit-btn">
                            {isMarathi ? 'पेमेंट निश्चित करा' : 'Confirm Payment'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCustomer(null)
                                setPaymentAmount('')
                                setMessage('')
                            }}
                        >
                            {isMarathi ? 'रद्द करा' : 'Cancel'}
                        </button>
                    </form>
                </div>
            )}

            {message && <p role="status">{message}</p>}

            <div className="udhar-table-card">
                <h3>
                    {isMarathi ? 'ग्राहकांच्या उधारीच्या नोंदी' : 'Customer Udhar Records'}
                </h3>

                <div className="udhar-table-wrap">
                    <table className="udhar-table">
                        <thead>
                            <tr>
                                <th>{isMarathi ? 'ग्राहक' : 'Customer'}</th>
                                <th>{isMarathi ? 'मोबाईल' : 'Mobile'}</th>
                                <th>{isMarathi ? 'तारीख' : 'Date'}</th>
                                <th>{isMarathi ? 'एकूण उधारी' : 'Total Udhar'}</th>
                                <th>{isMarathi ? 'भरलेली रक्कम' : 'Paid'}</th>
                                <th>{isMarathi ? 'बाकी' : 'Pending'}</th>
                                <th>{isMarathi ? 'कृती' : 'Action'}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {udhar.length === 0 ? (
                                <tr>
                                    <td colSpan="7">
                                        {isMarathi ? 'उधारीच्या नोंदी सापडल्या नाहीत.' : 'No Udhar Records Found'}
                                    </td>
                                </tr>
                            ) : (
                                udhar.map((customer) => {
                                    const pending = customer.amount - customer.paid

                                    return (
                                        <tr key={customer.id}>
                                            <td>{customer.name}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.date}</td>
                                            <td>₹{customer.amount.toLocaleString('en-IN')}</td>
                                            <td className="paid">
                                                ₹{customer.paid.toLocaleString('en-IN')}
                                            </td>
                                            <td className="pending">
                                                ₹{pending.toLocaleString('en-IN')}
                                            </td>
                                            <td>
                                                {pending > 0 ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedCustomer(customer.id)
                                                            setPaymentAmount('')
                                                            setMessage('')
                                                        }}
                                                    >
                                                        {isMarathi ? 'पेमेंट स्वीकारा' : 'Receive Payment'}
                                                    </button>
                                                ) : (
                                                    isMarathi ? 'पूर्ण भरले' : 'Paid'
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="udhar-table-card">
                <h3>
                    {isMarathi ? '💵 पेमेंट इतिहास' : '💵 Payment History'}
                </h3>

                <div className="udhar-table-wrap">
                    <table className="udhar-table">
                        <thead>
                            <tr>
                                <th>{isMarathi ? 'ग्राहक' : 'Customer'}</th>
                                <th>{isMarathi ? 'पेमेंट तारीख' : 'Payment Date'}</th>
                                <th>{isMarathi ? 'पेमेंट पद्धत' : 'Payment Method'}</th>
                                <th>{isMarathi ? 'प्राप्त रक्कम' : 'Received Amount'}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {udharPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="4">
                                        {isMarathi ? 'पेमेंट इतिहास उपलब्ध नाही.' : 'No Payment History Found'}
                                    </td>
                                </tr>
                            ) : (
                                [...udharPayments].reverse().map((payment) => (
                                    <tr key={payment.id}>
                                        <td>{payment.customerName}</td>
                                        <td>{payment.date}</td>
                                        <td>{(payment.paymentMethod || 'cash').toUpperCase()}</td>
                                        <td className="paid">
                                            ₹{payment.amount.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UdharManagement
