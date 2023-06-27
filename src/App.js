import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import StateDetails from './components/StateDetails'
import AboutRoute from './components/AboutRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateDetails} />
    <Route exact path="/about" component={AboutRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
