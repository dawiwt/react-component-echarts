import './index.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import example from './example'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Area'
        }
    }
    render() {
        const Chart = example[this.state.name]
        return (
            <div className="demo-container">
                <header>
                    <h1>React Component Echarts</h1>
                    <h3>
                        组件式百度图表 👉{' '}
                        <a className="active" href="./tools.html" target="\_parent">
                            辅助工具
                        </a>
                    </h3>
                    <a href="https://github.com/dawiwt/react-component-echarts" target="\_parent">
                        <img alt="" src="https://img.shields.io/github/stars/dawiwt/react-component-echarts.svg?style=social&label=Star" />
                    </a>
                </header>
                <div className="demo-header">
                    <p className="list-title">图表列表</p>
                    {Chart.codesandboxKey && (
                        <a className="codesandbox-btn" href={`https://codesandbox.io/s/${Chart.codesandboxKey}`} target="\_parent">
                            <img alt={`Edit CodeSandbox ${Chart.title}`} src="https://codesandbox.io/static/img/play-codesandbox.svg" />
                        </a>
                    )}
                </div>
                <div className="demo-body">
                    <ul className="demo-slider">
                        {Object.keys(example).map((name, key) => (
                            <li key={`demo-slider-${key}`}>
                                <a
                                    href="javascript:void(0);"
                                    className={this.state.name == name ? 'active' : ''}
                                    onClick={() => this.setState({ name })}>
                                    {example[name].title}
                                </a>
                                <sub>[{example[name].type}]</sub>
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
