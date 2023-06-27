import './index.css'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="nav-logo-title">
        COVID19
        <span className="nav-title-span">INDIA</span>
      </h1>
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-icons-container">
        <VscGithubAlt className="footer-icon" size="50" />
        <FiInstagram className="footer-icon" size="50" />
        <FaTwitter className="footer-icon" size="50" />
      </div>
    </div>
  )
}
