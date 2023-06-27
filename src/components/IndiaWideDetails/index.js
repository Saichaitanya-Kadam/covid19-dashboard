import './index.css'

const IndiaWideDetails = props => {
  const {data, statesList} = props
  let activeCases = 0
  let recoveredCases = 0
  let confirmedCases = 0
  let deceasedCases = 0

  statesList.forEach(item => {
    if (data[item.state_code]) {
      const {total} = data[item.state_code]
      recoveredCases += total.recovered ? total.recovered : 0
      confirmedCases += total.confirmed ? total.confirmed : 0
      deceasedCases += total.deceased ? total.deceased : 0
    }
  })

  activeCases = confirmedCases - (deceasedCases + recoveredCases)

  return (
    <div className="india-wide-cases-container">
      <div className="case-container" testid="countryWideConfirmedCases">
        <p className="cases-description confirmed">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438432/Covid19%20Dashboard/check-mark_1_odg0vn.png"
          alt="country wide confirmed cases pic"
          className="cases-pic"
        />
        <p className="cases-count confirmed">{confirmedCases}</p>
      </div>
      <div className="case-container" testid="countryWideActiveCases">
        <p className="cases-description active">Active</p>
        <img
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438417/Covid19%20Dashboard/protection_1_zjqmhw.png"
          alt="country wide active cases pic"
          className="cases-pic"
        />
        <p className="cases-count active">{activeCases}</p>
      </div>
      <div className="case-container" testid="countryWideRecoveredCases">
        <p className="cases-description recovered">Recovered</p>
        <img
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438418/Covid19%20Dashboard/recovered_1_qmgv0f.png"
          alt="country wide recovered cases pic"
          className="cases-pic"
        />
        <p className="cases-count recovered">{recoveredCases}</p>
      </div>
      <div className="case-container" testid="countryWideDeceasedCases">
        <p className="cases-description deceased">Deceased</p>
        <img
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438420/Covid19%20Dashboard/breathing_1_ctu4mw.png"
          alt="country wide deceased cases pic"
          className="cases-pic"
        />
        <p className="cases-count deceased">{deceasedCases}</p>
      </div>
    </div>
  )
}
export default IndiaWideDetails
