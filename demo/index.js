import './index.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import Area from './example/area'
import Line from './example/line'
import Marker from './example/marker'
import Bar from './example/bar'
import BarPolar from './example/barPolar'
import Pie from './example/pie'
import Scatter from './example/scatter'
import TheMap from './example/map'

const demos = {
    StackedAreaChart: {
        type: 'area',
        title: '区域图',
        component: Area
    },
    DistributionOfElectricity: {
        type: 'line',
        title: '折线图',
        component: Line
    },
    WeekTemperature: {
        type: 'marker',
        title: '标记',
        component: Marker
    },
    GradientColorShadowClickZoom: {
        type: 'bar',
        title: '柱状图',
        component: Bar
    },
    BarPolarRealEstate: {
        type: 'bar-polar',
        title: '柱状极坐标',
        component: BarPolar
    },
    PieCustom: {
        type: 'pie',
        title: '饼图',
        component: Pie
    },
    ScatterAqiColor: {
        type: 'scatter',
        title: '散点图',
        component: Scatter
    },
    TheMap: {
        type: ' map',
        title: 'iphone销量',
        component: TheMap
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'StackedAreaChart'
        }
    }
    render() {
        const Chart = demos[this.state.name]
        return (
            <div className="demo-container">
                <header>
                    <h1>React Component Echarts</h1>
                    <h3>
                        组件式百度图表 👉{' '}
                        <a href="./tools.html" target="\_parent">
                            辅助工具
                        </a>
                    </h3>
                    <a href="https://github.com/dawiwt/react-component-echarts" target="\_parent">
                        <img alt="" src="https://img.shields.io/github/stars/dawiwt/react-component-echarts.svg?style=social&label=Star" />
                    </a>
                </header>
                <div className="demo-body">
                    <ul className="demo-slider">
                        {Object.keys(demos).map((name, key) => (
                            <li key={`demo-slider-${key}`}>
                                <a href="javascript:void(0);" onClick={() => this.setState({ name })}>
                                    {demos[name].title}
                                </a>
                                <sub>[{demos[name].type}]</sub>
                            </li>
                        ))}
                    </ul>
                    <div className="demo-content">
                        <section>
                            <Chart.component />
                        </section>
                    </div>
                </div>
                <footer>
                    <p>
                        <span>Github 👉 </span>
                        <a href="https://github.com/dawiwt/react-component-echarts" target="\_parent">
                            https://github.com/dawiwt/react-component-echarts
                        </a>
                    </p>
                </footer>
            </div>
        )
    }
}

render(<App />, document.querySelector('#root'))
