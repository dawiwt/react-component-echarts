import React, { Component } from 'react'
import pretty from 'pretty'
import tagNames from '../tags'

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
                return this.toJSX(new Function(`return ${options}`)(), tagName)
            }

            if (options === null || typeof options !== 'object') {
                return `<${tagName} />`
            }

            const rows = ['<' + tagName]
            const keys = Object.keys(options)

            // 子元素数组
            const childRows = []
            const childKeys = keys.filter(key => {
                const value = options[key]
                if (
                    Array.isArray(value) &&
                    value.filter(
                        item =>
                            // 1. 数组
                            // 2. null
                            // 3. 非对象
                            Array.isArray(item) || item === null || typeof item !== 'object'
                    ).length > 0
                ) {
                    // 如果值为数组
                    // 并且数组中存在不可转换的项
                    // 则做为属性处理
                    return false
                }
                return tagNames.includes(key) && typeof value === 'object'
            })
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
                    propRows.push(`${key}="$${value.name}$"`)
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
            return this.handleError(err, obj, tagName)
        }
    }
    handleError = (err, options, tagName) => {
        console.log(err)
        // 变量未定义，自动创建变量
        if (err instanceof ReferenceError) {
            // 取变量名称
            const varName = err.message.split(' ')[0]
            this.vars.push((window[varName] = `$${varName}$`))
        } else if (err instanceof TypeError) {
            this.setState({
                err: `请手动删除错误提示中的相关函数：${err.message}`
            })
            return false
        } else {
            return false
        }
        return this.toJSX(options, tagName)
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
        this.setState({ err: false })
        if (this.vars) {
            this.vars.forEach(v => delete window[v.replace(/\$/g, '')])
        }
        this.vars = []
        try {
            this.setState({
                vars: this.vars,
                jsx: pretty(this.toJSX()),
                modules: this.modules.map(this.firstLetterToUpperCase)
            })
        } catch (err) {
            console.log(err)
            this.setState({
                err: err.message,
                modules: [],
                vars: [],
                jsx: ''
            })
        }
    }
    render() {
        const { vars, modules, jsx, err } = this.state
        return (
            <div>
                <textarea cols={150} rows={30} onChange={this.handleChange} value={this.state.options} />
                {vars && vars.length > 0 && (
                    <div>
                        <p>请替换图表代码中以下字符串为真实变量</p>
                        <ul>
                            {vars.map((v, k) => (
                                <li key={`vars-${k}`}>{v}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <p>
                    <button onClick={this.transformation}>运行</button> >>>
                </p>

                {err && <p>{err}</p>}
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
