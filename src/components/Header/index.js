import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav>
    <Link to="/" className="nav-link">
      <h1 className="nav-logo-title">
        COVID19
        <span className="nav-title-span">INDIA</span>
      </h1>
    </Link>
    <ul className="nav-items-container">
      <Link to="/" className="nav-link">
        <li>Home</li>
      </Link>
      <Link to="/about" className="nav-link">
        <li>About</li>
      </Link>
    </ul>
  </nav>
)

export default Header
