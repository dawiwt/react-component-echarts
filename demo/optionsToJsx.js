import React, { Component } from 'react'
import pretty from 'pretty'

// 全部节点属性
const tagNames = [
    'title',
    'legend',
    'tooltip',
    'axisPointer',
    'label',
    'toolbox',
    'feature',
    'grid',
    'xAxis',
    'yAxis',
    'series',
    'dataZoom',
    'link',
    'visualMap',
    'markArea',
    'markLine',
    'graphic',
    'children',
    'splitLine',
    'axisLabel',
    'style',
    'lineStyle'
]

export default class extends Component {
    constructor() {
        super()
        this.state = {
            options: '',
            jsx: '',
            modules: [],
            vars: []
        }
    }
    firstLetterToUpperCase = str => {
        return str.replace(/^\S/, function(s) {
            return s.toUpperCase()
        })
    }
    toJSX = (obj, tagName = 'Recharts') => {
        try {
            const options = obj || this.state.options
            if (typeof options === 'string') {
                return this.toJSX(eval('(' + this.state.options + ')'))
            }

            const rows = ['<' + tagName]
            const keys = Object.keys(options)

            // 子元素数组
            const childRows = []
            const childKeys = keys.filter(key => tagNames.includes(key))
            for (let c = 0, cl = childKeys.length; c < cl; c++) {
                const key = childKeys[c],
                    name = this.firstLetterToUpperCase(key),
                    value = options[key]
                if (Array.isArray(value)) {
                    Array.prototype.push.apply(childRows, value.map(item => this.toJSX(item, name)))
                } else {
                    childRows.push(this.toJSX(value, name))
                }
            }

            // 属性数组
            const propRows = []
            const propKeys = keys.filter(key => !childKeys.includes(key))
            for (let p = 0, pl = propKeys.length; p < pl; p++) {
                const key = propKeys[p],
                    value = options[key]
                if (typeof value === 'string') {
                    propRows.push(`${key}="${value}"`)
                } else if (typeof value === 'function') {
                    propRows.push(`${key}="${value.name}"`)
                } else {
                    propRows.push(`${key}={${JSON.stringify(value)}}`)
                }
            }

            this.modules = this.modules.concat(childKeys.filter(key => !this.modules.includes(key)))

            if (propRows.length) {
                Array.prototype.push.apply(rows, propRows)
            }

            if (childRows.length) {
                rows.push('>')
                Array.prototype.push.apply(rows, childRows)
                rows.push(`</${tagName}>`)
            } else {
                rows.push('/>')
            }
            return rows.join(' ')
        } catch (err) {
            console.error(err)
            this.setState({
                jsx: err.toString()
            })
        }
    }
    handleChange = event => {
        const { value } = event.target
        this.setState(
            {
                options: value
            },
            this.transformation
        )
    }
    transformation = () => {
        this.modules = []
        try {
            this.setState({
                jsx: pretty(this.toJSX()),
                modules: this.modules.map(this.firstLetterToUpperCase)
            })
        } catch (err) {
            console.log(err)
            this.setState({
                jsx: err.toString()
            })
        }
    }
    handleAddVar = () => {
        const { value } = this.input
        if (value) {
            try {
                eval('window.' + value)
                this.setState({
                    vars: [value, ...this.state.vars]
                })
                this.input.value = ''
            } catch (err) {
                console.error(err)
            }
        }
    }
    render() {
        const { vars, modules, jsx } = this.state
        return (
            <div>
                <textarea cols={150} rows={30} onChange={this.handleChange} value={this.state.options} />
                <p>
                    <input type="text" placeholder="请输入变量，例：a={}" ref={input => (this.input = input)} />
                    <span>&nbsp;</span>
                    <button onClick={this.handleAddVar}>添加变量</button>
                </p>
                <div>
                    {vars.map((v, key) => (
                        <p key={`var-${key}`}>{v}</p>
                    ))}
                </div>
                <p>
                    <button onClick={this.transformation}>运行</button> >>>
                </p>
                {!!modules.length && (
                    <code>
                        <pre>
                            //导入组件
                            <br />
                            {`import { Recharts, Components } from 'react-echarts'`}
                            <br />
                            {`const { ${modules.join(', ')} } = Components`}
                        </pre>
                    </code>
                )}
                {!!jsx && (
                    <code>
                        <pre>
                            //图表代码
                            <br />
                            {jsx}
                        </pre>
                    </code>
                )}
            </div>
        )
    }
}
