
import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import StatsGrid from '../components/dashboard/StatsGrid'
import WeeklyOverview from '../components/dashboard/WeeklyOverview'
import QuickActions from '../components/dashboard/QuickActions'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import './Dashboard.css'
import { useLanguage } from '../context/LanguageContext'
function Dashboard() {
  const { language } = useLanguage()
  return (
    <div className="dashboard-page">
      <WelcomeBanner />

      <StatsGrid />

      <div className="dashboard-content-grid">
        <WeeklyOverview />
        <QuickActions />
      </div>

      <RecentTransactions />

      <footer className="dashboard-footer">
       {language === 'Marathi'
  ? '© 2026 हॉटेल हनुमान | आर्थिक व्यवस्थापन सॉफ्टवेअर'
  : '© 2026 Hotel Hanuman | Cash Flow Management Software'}
      </footer>
    </div>
  )
}

export default Dashboard
