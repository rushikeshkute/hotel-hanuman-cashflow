
import './WelcomeBanner.css'
import { useLanguage } from '../../context/LanguageContext'

function WelcomeBanner() {
  const { language } = useLanguage()

  return (
    <section className="welcome-banner">
      <div className="welcome-content">
        <span className="welcome-tag">HOTEL HANUMAN</span>

        <h1>
          {language === 'Marathi'
            ? 'शुभ सकाळ! 👋'
            : 'Good Morning! 👋'}
        </h1>

        <p>
          {language === 'Marathi'
            ? 'आज तुमचे हॉटेल कसे चालले आहे ते पाहूया.'
            : "Let's check how your hotel is performing today."}
        </p>
      </div>

      <div className="welcome-illustration">
        🏨
      </div>
    </section>
  )
}

export default WelcomeBanner
