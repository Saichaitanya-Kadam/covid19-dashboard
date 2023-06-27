import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import BarChartView from '../BarChartView'

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

class StateDetails extends Component {
  state = {
    stateData: {},
    lastUpdatedDate: '',
    tested: 0,
    stateName: '',
    activeBtn: 'confirmed',
    loading: true,
    stateCode: '',
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const response = await fetch(`https://apis.ccbp.in/covid19-state-wise-data`)
    const data = await response.json()
    const stateData = data[stateCode]

    const lastUpdatedDate = stateData.meta.last_updated
    const {tested} = stateData.total
    const stateName = statesList.filter(
      item => item.state_code === stateCode,
    )[0].state_name

    this.setState({
      stateData,
      tested,
      lastUpdatedDate,
      stateName,
      loading: false,
      stateCode,
    })
  }

  onClickActiveBtn = value => {
    this.setState({activeBtn: value})
  }

  getDistrictData = () => {
    const {stateData, activeBtn} = this.state

    const districtNames = Object?.keys(stateData?.districts)
    const districtCasesDetails = districtNames.map(item => ({
      districtName: item,
      value: stateData.districts[item].total[activeBtn]
        ? stateData.districts[item].total[activeBtn]
        : 0,
    }))
    districtCasesDetails.sort((a, b) => (a.value < b.value ? 1 : -1))

    const activeCasesDetails = districtNames.map(item => ({
      districtName: item,
      value:
        stateData.districts[item].total.confirmed -
        (stateData.districts[item].total.recovered +
          stateData.districts[item].total.deceased)
          ? stateData.districts[item].total.confirmed -
            (stateData.districts[item].total.recovered +
              stateData.districts[item].total.deceased)
          : 0,
    }))
    activeCasesDetails.sort((a, b) => (a.value < b.value ? 1 : -1))
    if (activeBtn === 'active') {
      return activeCasesDetails
    }
    return districtCasesDetails
  }

  getSuccessView = () => {
    const {
      stateData,
      stateCode,
      tested,
      lastUpdatedDate,
      stateName,
      activeBtn,
    } = this.state
    const districtData = this.getDistrictData()
    return (
      <div className="home-content-container">
        <div className="state-details-state-details">
          <h1 className="state-detail-state-name">{stateName}</h1>
          <p className="tested-text">
            Tested <br />
            <p>{tested}</p>
          </p>
        </div>
        <p className="last-update-text">{`last updated on ${lastUpdatedDate}`}</p>
        <div className="india-wide-cases-container">
          <div
            testid="stateSpecificConfirmedCasesContainer"
            className={`case-container-btn confirmed-btn ${
              activeBtn === 'confirmed' ? 'active-confirmed' : ''
            }`}
          >
            <button
              type="button"
              className={`card-btn case-container-btn confirmed-btn ${
                activeBtn === 'confirmed' ? 'active-confirmed' : ''
              }`}
              onClick={() => {
                this.onClickActiveBtn('confirmed')
              }}
            >
              <p className="cases-description confirmed">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438432/Covid19%20Dashboard/check-mark_1_odg0vn.png"
                alt="state specific confirmed cases pic"
                className="cases-pic"
              />
              <p className="cases-count confirmed">
                {stateData?.total?.confirmed}
              </p>
            </button>
          </div>
          <div
            testid="stateSpecificActiveCasesContainer"
            className={`case-container-btn active-btn ${
              activeBtn === 'active' ? 'active-active' : ''
            }`}
          >
            <button
              className={`card-btn case-container-btn active-btn ${
                activeBtn === 'active' ? 'active-active' : ''
              }`}
              type="button"
              onClick={() => {
                this.onClickActiveBtn('active')
              }}
            >
              <p className="cases-description active">Active</p>
              <img
                src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438417/Covid19%20Dashboard/protection_1_zjqmhw.png"
                alt="state specific active cases pic"
                className="cases-pic"
              />
              <p className="cases-count active">
                {stateData?.total?.confirmed -
                  (stateData?.total?.recovered + stateData?.total.deceased)}
              </p>
            </button>
          </div>
          <div
            testid="stateSpecificRecoveredCasesContainer"
            className={`case-container-btn recovered-btn ${
              activeBtn === 'recovered' ? 'active-recovered' : ''
            }`}
          >
            <button
              type="button"
              className={`card-btn case-container-btn recovered-btn ${
                activeBtn === 'recovered' ? 'active-recovered' : ''
              }`}
              onClick={() => {
                this.onClickActiveBtn('recovered')
              }}
            >
              <p className="cases-description recovered">Recovered</p>
              <img
                src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438418/Covid19%20Dashboard/recovered_1_qmgv0f.png"
                alt="state specific recovered cases pic"
                className="cases-pic"
              />
              <p className="cases-count recovered">
                {stateData?.total?.recovered}
              </p>
            </button>
          </div>
          <div
            testid="stateSpecificDeceasedCasesContainer"
            className={`case-container-btn deceased-btn ${
              activeBtn === 'deceased' ? 'active-deceased' : ''
            }`}
          >
            <button
              type="button"
              className={`card-btn case-container-btn deceased-btn ${
                activeBtn === 'deceased' ? 'active-deceased' : ''
              }`}
              onClick={() => {
                this.onClickActiveBtn('deceased')
              }}
            >
              <p className="cases-description deceased">Deceased</p>
              <img
                src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438420/Covid19%20Dashboard/breathing_1_ctu4mw.png"
                alt="state specific deceased cases pic"
                className="cases-pic"
              />
              <p className="cases-count deceased">
                {stateData?.total?.deceased}
              </p>
            </button>
          </div>
        </div>
        <h1 className={`top-district-heading ${activeBtn}`}>Top Districts</h1>
        <ul className="district-container" testid="topDistrictsUnorderedList">
          {districtData.map(item => (
            <li key={item.districtName} className="district-item">
              <p className="cases-count-district">{item.value}</p>
              <p className="district-name">{item.districtName}</p>
            </li>
          ))}
        </ul>
        <BarChartView stateCode={stateCode} activeBtn={activeBtn} />
        <Footer />
      </div>
    )
  }

  render() {
    const {loading} = this.state
    return (
      <div className="home-main-container">
        <Header />
        {loading ? (
          <div className="loader-container" testid="stateDetailsLoader">
            <Loader type="Oval" color="#007BFF" height={50} />
          </div>
        ) : (
          this.getSuccessView()
        )}
      </div>
    )
  }
}

export default StateDetails
