import './StatCard.css'

function StatCard({ title, amount, change, icon, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-top">
        <span>{title}</span>

        <div className="stat-icon">
          {icon}
        </div>
      </div>

      <h2>{amount}</h2>

      <p>{change}</p>
    </div>
  )
}

export default StatCard