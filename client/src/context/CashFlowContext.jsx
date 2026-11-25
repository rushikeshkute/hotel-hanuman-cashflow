
import { createContext, useContext, useEffect, useState } from 'react'

const CashFlowContext = createContext()

function getSavedData(key) {
  try {
    const savedData = localStorage.getItem(key)
    return savedData ? JSON.parse(savedData) : []
  } catch {
    return []
  }
}

export function CashFlowProvider({ children }) {
  const [sales, setSales] = useState(() => getSavedData('hotel_sales'))
  const [expenses, setExpenses] = useState(() => getSavedData('hotel_expenses'))
  const [udhar, setUdhar] = useState(() => getSavedData('hotel_udhar'))
  const [udharPayments, setUdharPayments] = useState(() =>
    getSavedData('hotel_udhar_payments')
  )

  useEffect(() => {
    localStorage.setItem('hotel_sales', JSON.stringify(sales))
  }, [sales])

  useEffect(() => {
    localStorage.setItem('hotel_expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem('hotel_udhar', JSON.stringify(udhar))
  }, [udhar])

  useEffect(() => {
    localStorage.setItem(
      'hotel_udhar_payments',
      JSON.stringify(udharPayments)
    )
  }, [udharPayments])

  return (
    <CashFlowContext.Provider
      value={{
        sales,
        setSales,
        expenses,
        setExpenses,
        udhar,
        setUdhar,
        udharPayments,
        setUdharPayments,
      }}
    >
      {children}
    </CashFlowContext.Provider>
  )
}

export function useCashFlow() {
  const context = useContext(CashFlowContext)

  if (!context) {
    throw new Error('useCashFlow must be used inside CashFlowProvider')
  }

  return context
}
