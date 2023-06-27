import './index.css'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'

const SearchContainer = props => {
  const {searchInput, statesList, onChangeSearch} = props
  const onSearchChange = event => {
    onChangeSearch(event.target.value)
  }
  const filteredData = statesList.filter(item =>
    item.state_name.toLowerCase().includes(searchInput.toLowerCase()),
  )
  return (
    <div className="search">
      <div className="search-container">
        <BsSearch />
        <input type="search" onChange={onSearchChange} value={searchInput} />
      </div>
      {searchInput !== '' && (
        <ul
          className="search-suggestion-list"
          testid="searchResultsUnorderedList"
        >
          {filteredData.map(item => (
            <Link to={`state/${item.state_code}`} className="search-link">
              <li className="search-suggestion-container">
                <p>{item.state_name}</p>
                <div className="search-state-code-container">
                  <p className="state-code-text-search">{item.state_code}</p>
                  <BiChevronRightSquare size="20" />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}
export default SearchContainer
