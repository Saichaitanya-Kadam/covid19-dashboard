import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import IndiaWideDetails from '../IndiaWideDetails'
import Footer from '../Footer'
import SearchContainer from '../SearchContainer'
import AllStatesStats from '../AllStatesStats'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Home extends Component {
  state = {data: {}, status: apiStatus.initial, searchInput: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: apiStatus.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const data = await response.json()
      this.setState({data, status: apiStatus.success})
    }
  }

  onChangeSearch = searchInput => {
    this.setState({searchInput})
  }

  renderSuccessView = () => {
    const {searchInput, data} = this.state
    return (
      <div className="home-content-container">
        <SearchContainer
          statesList={statesList}
          searchInput={searchInput}
          onChangeSearch={this.onChangeSearch}
        />
        {searchInput === '' && (
          <>
            <IndiaWideDetails data={data} statesList={statesList} />
            <AllStatesStats data={data} statesList={statesList} />
            <Footer />
          </>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="homeRouteLoader">
      <Loader type="Oval" color="#007BFF" height={50} />
    </div>
  )

  getApiStatusView = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-main-container">
        <Header />
        {this.getApiStatusView()}
      </div>
    )
  }
}
export default Home
