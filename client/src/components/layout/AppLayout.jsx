
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileNav from './MobileNav'
import './AppLayout.css'

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-main">
        <Header />

        <div className="app-content">
          <Outlet />
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

export default AppLayout
