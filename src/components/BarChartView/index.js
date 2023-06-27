import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import './index.css'
import Loader from 'react-loader-spinner'

class BarChartView extends Component {
  state = {graphData: [], loading: true}

  componentDidMount() {
    this.getStateTimelineData()
  }

  getStateTimelineData = async () => {
    const {stateCode} = this.props
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
    )
    const data = await response.json()
    const {dates} = data[stateCode]
    const datesList = Object.keys(dates)
    const graphData = datesList.map(item => ({
      date: item,
      confirmed: dates[item].total.confirmed,
      recovered: dates[item].total.recovered,
      deceased: dates[item].total.deceased,
      active:
        dates[item].total.confirmed -
        (dates[item].total.recovered + dates[item].total.deceased),
      tested: dates[item].total.tested,
    }))

    this.setState({
      graphData,
      loading: false,
    })
  }

  renderLineGraph = (type, color) => {
    const {graphData} = this.state
    return (
      <LineChart
        width={1000}
        height={250}
        data={graphData}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <XAxis
          dataKey="date"
          style={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
          dy={10}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={type} stroke={color} />
      </LineChart>
    )
  }

  renderBarGraph = () => {
    const {graphData} = this.state
    const barGraphData = graphData.slice(
      graphData.length - 10,
      graphData.length,
    )
    const {activeBtn} = this.props
    let color
    switch (activeBtn) {
      case 'active':
        color = '#007BFF'
        break
      case 'confirmed':
        color = '#FF073A'
        break
      case 'recovered':
        color = '#28A745'
        break
      case 'deceased':
        color = '#6C757D'
        break
      default:
        break
    }
    return (
      <div className="graph-container">
        <BarChart
          width={1000}
          height={400}
          data={barGraphData}
          barSize={45}
          margin={{top: 20, right: 20, bottom: 20, left: 20}}
        >
          <XAxis
            dataKey="date"
            stroke={color}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={`${activeBtn}`}
            fill={color}
            label={{position: 'top', fill: color}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  render() {
    const {loading} = this.state
    return (
      <>
        {loading ? (
          <div
            className="loader-container-barCharts"
            testid="timelinesDataLoader"
          >
            <Loader type="Oval" color="#007BFF" height={50} />
          </div>
        ) : (
          <>
            {this.renderBarGraph()}
            <h1 className="daily-spreads-heading">Daily Spread Trends</h1>
            <div testid="lineChartsContainer">
              <div className="lineChart-container-confirmed">
                {this.renderLineGraph('confirmed', '#FF073A')}
              </div>
              <div className="lineChart-container-active">
                {this.renderLineGraph('active', '#007BFF')}
              </div>
              <div className="lineChart-container-recovered">
                {this.renderLineGraph('recovered', '#28A745')}
              </div>
              <div className="lineChart-container-deceased">
                {this.renderLineGraph('deceased', '#6C757D')}
              </div>
              <div className="lineChart-container-tested">
                {this.renderLineGraph('tested', '#9673B9')}
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}
export default BarChartView
