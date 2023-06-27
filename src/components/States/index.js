import {Link} from 'react-router-dom'
import './index.css'

const State = props => {
  const {state} = props
  const {
    deceased,
    other,
    population,
    stateName,
    confirmed,
    stateCode,
    recovered,
  } = state
  const active = confirmed - recovered - deceased - other
  return (
    <li className="table-header-container">
      <div className="table-states-header-container">
        <Link to={`/state/${stateCode}`} className="state-nav-link">
          <p className="cases-count state-name">{stateName}</p>
        </Link>
      </div>
      <div className="table-header">
        <p className="confirmed cases-count">{confirmed}</p>
      </div>
      <div className="table-header">
        <p className="active cases-count">{active}</p>
      </div>
      <div className="table-header">
        <p className="recovered cases-count">{recovered}</p>
      </div>
      <div className="table-header">
        <p className="deceased cases-count">{deceased}</p>
      </div>
      <div className="table-header">
        <p className="population cases-count">{population}</p>
      </div>
    </li>
  )
}

export default State
