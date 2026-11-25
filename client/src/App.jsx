
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import AppLayout from './components/layout/AppLayout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DailySales from './pages/DailySales'
import DailyExpenses from './pages/DailyExpenses'
import CashBook from './pages/CashBook'
import UdharManagement from './pages/UdharManagement'
import MonthlyReports from './pages/MonthlyReports'
import StaffManagement from './pages/StaffManagement'
import Settings from './pages/Settings'

import { CashFlowProvider } from './context/CashFlowContext'
import { AuthProvider, useAuth } from './context/AuthContext'

// Login Protection
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Owner Only Protection
function OwnerRoute({ children }) {
  const { user } = useAuth()

  if (user?.role !== 'owner') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
      <CashFlowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sales" element={<DailySales />} />
              <Route path="/expenses" element={<DailyExpenses />} />
              <Route path="/cashbook" element={<CashBook />} />
              <Route path="/udhar" element={<UdharManagement />} />
              <Route path="/reports" element={<MonthlyReports />} />

              {/* Owner Only Pages */}
              <Route
                path="/staff"
                element={
                  <OwnerRoute>
                    <StaffManagement />
                  </OwnerRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <OwnerRoute>
                    <Settings />
                  </OwnerRoute>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CashFlowProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
