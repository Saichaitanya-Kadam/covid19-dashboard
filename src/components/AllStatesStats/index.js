import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {useState} from 'react'
import States from '../States'
import './index.css'

const AllStatesStats = props => {
  const [sorted, setSorted] = useState(false)
  const [sortedArr, setSortedArr] = useState([])
  const {data, statesList} = props
  const statesData = statesList.map(item => ({
    stateCode: item.state_code,
    stateName: item.state_name,
    confirmed: Object.keys(data)
      .filter(state => state === item.state_code)
      .map(e => data[e].total.confirmed),
    deceased: Object.keys(data)
      .filter(state => state === item.state_code)
      .map(e => data[e].total.deceased),
    recovered: Object.keys(data)
      .filter(state => state === item.state_code)
      .map(e => data[e].total.recovered),
    population: Object.keys(data)
      .filter(state => state === item.state_code)
      .map(e => data[e].meta.population),
    other: Object.keys(data)
      .filter(state => state === item.state_code)
      .map(e => data[e].total.other),
  }))

  const onClickDesc = () => {
    const sortedArrDesc = statesData.sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? -1 : 1,
    )
    setSorted(true)
    setSortedArr(sortedArrDesc)
    console.log(sorted)
  }

  const onClickAsc = () => {
    setSorted(false)
  }

  return (
    <div
      className="state-wise-cases-container"
      testid="stateWiseCovidDataTable"
    >
      <div className="table-header-container">
        <div className="table-states-header-container">
          <p className="table-header-text">States/UT</p>
          <div className="sort-btn-container">
            <button
              type="button"
              className="sort-btn"
              onClick={onClickAsc}
              testid="ascendingSort"
            >
              <FcGenericSortingAsc />
            </button>
            <button
              type="button"
              className="sort-btn"
              onClick={onClickDesc}
              testid="descendingSort"
            >
              <FcGenericSortingDesc color="#f8fafc" />
            </button>
          </div>
        </div>
        <div className="table-header">
          <p className="table-header-text">Confirmed</p>
        </div>
        <div className="table-header">
          <p className="table-header-text">Active</p>
        </div>
        <div className="table-header">
          <p className="table-header-text">Recovered</p>
        </div>
        <div className="table-header">
          <p className="table-header-text">Deceased</p>
        </div>
        <div className="table-header">
          <p className="table-header-text">Population</p>
        </div>
      </div>
      <hr />
      <ul className="states-container">
        {!sorted &&
          statesData.map(item => <States key={item.stateCode} state={item} />)}
        {sorted &&
          sortedArr.map(item => <States key={item.stateCode} state={item} />)}
      </ul>
    </div>
  )
}

export default AllStatesStats
