import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import StackedAreaChart from './example/stackedAreaChart'
import RainfallAndWaterFlow from './example/rainfallAndWaterFlow'
import LineGradient from './example/lineGradient'
import DistributionOfElectricity from './example/distributionOfElectricity'
import CustomGraphicComponent from './example/customGraphicComponent'
import OptionsToJsx from './optionsToJsx'

const App = withRouter(
    class extends Component {
        componentDidMount() {
            this.props.history.listen(params => {
                // code here...
            })
        }
        render() {
            return (
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, padding: 10 }}>
                    <h2>
                        图表 <Link to="options-to-jsx">options-to-jsx</Link>
                    </h2>
                    <nav>
                        <Link to="stacked-area-chart">StackedAreaChart</Link>&nbsp;
                        <Link to="rainfall-and-water-flow">RainfallAndWaterFlow</Link>&nbsp;
                        <Link to="line-gradient">LineGradient</Link>&nbsp;
                        <Link to="distribution-of-electricity">DistributionOfElectricity</Link>&nbsp;
                        <Link to="custom-graphic-component">CustomGraphicComponent</Link>&nbsp;
                    </nav>
                    <Switch>
                        <Route path="/options-to-jsx" component={OptionsToJsx} />
                        <Route path="/stacked-area-chart" component={StackedAreaChart} />
                        <Route path="/rainfall-and-water-flow" component={RainfallAndWaterFlow} />
                        <Route path="/line-gradient" component={LineGradient} />
                        <Route path="/distribution-of-electricity" component={DistributionOfElectricity} />
                        <Route path="/custom-graphic-component" component={CustomGraphicComponent} />
                    </Switch>
                </div>
            )
        }
    }
)

function Root() {
    return (
        <Router basename="/">
            <App />
        </Router>
    )
}

render(<Root />, document.querySelector('#root'))
