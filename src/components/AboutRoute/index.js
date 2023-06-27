import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

class AboutRoute extends Component {
  state = {loading: true, faqsList: []}

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const data = await response.json()
    const {faq} = data
    console.log(faq)
    this.setState({loading: false, faqsList: faq})
  }

  render() {
    const {faqsList, loading} = this.state
    return (
      <div className="home-main-container">
        <Header />
        <div className="home-content-container">
          {loading ? (
            <div className="loader-container" testid="aboutRouteLoader">
              <Loader type="Oval" color="#007BFF" height={50} />
            </div>
          ) : (
            <>
              <h1 className="about-heading">About</h1>
              <p className="about-description">
                Last update on march 28th 2021.
              </p>
              <h2>COVID-19 vaccines be ready for distribution</h2>
              <ul className="faqs-list" testid="faqsUnorderedList">
                {faqsList.map(item => (
                  <li key={item.qno}>
                    <p className="faq-question">{item.question}</p>
                    <p className="faq-answer">{item.answer}</p>
                  </li>
                ))}
              </ul>
              <Footer />
            </>
          )}
        </div>
      </div>
    )
  }
}
export default AboutRoute
