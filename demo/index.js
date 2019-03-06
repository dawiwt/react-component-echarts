import './index.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import StackedAreaChart from './example/stackedAreaChart'
import DistributionOfElectricity from './example/distributionOfElectricity'
import WeekTemperature from './example/weekTemperature'
import GradientColorShadowClickZoom from './example/gradientColorShadowClickZoom'
import BarPolarRealEstate from './example/barPolarRealEstate'
import PieCustom from './example/pieCustom'
import ScatterAqiColor from './example/scatterAqiColor'
import TheMap from './example/map'

const demos = {
    StackedAreaChart: {
        type: 'area',
        title: '堆叠区域图',
        component: StackedAreaChart
    },
    DistributionOfElectricity: {
        type: 'line',
        title: '一天用电量分布',
        component: DistributionOfElectricity
    },
    WeekTemperature: {
        type: 'marker',
        title: '未来一周气温变化',
        component: WeekTemperature
    },
    GradientColorShadowClickZoom: {
        type: 'bar',
        title: '特性示例：渐变色 阴影 点击缩放',
        component: GradientColorShadowClickZoom
    },
    BarPolarRealEstate: {
        type: 'bar-polar',
        title: '在中国租个房子有多贵',
        component: BarPolarRealEstate
    },
    PieCustom: {
        type: 'pie',
        title: '自定义饼图',
        component: PieCustom
    },
    ScatterAqiColor: {
        type: 'scatter',
        title: '散点图',
        component: ScatterAqiColor
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
