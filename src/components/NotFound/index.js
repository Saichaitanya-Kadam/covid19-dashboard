import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div>
    <img
      src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1652011250/Covid19%20Dashboard/PageNotFound_jyng5w.png"
      alt="not-found-pic"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Home</button>
    </Link>
  </div>
)
export default NotFound
