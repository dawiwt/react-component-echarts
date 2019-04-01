import './index.less'
import React, { Component } from 'react'
import beautify from 'js-beautify'
import AceEditor from 'react-ace'
import ClipboardJS from 'clipboard'
import 'brace/mode/jsx'
import 'brace/mode/python'
import 'brace/theme/solarized_light'
import 'brace/ext/searchbox'
import tagNames from '../tags'

const opts = { indent_size: 2 }

const copy =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABTUlEQVRYR+2W4U3DMBSEz14CChsgKGySvClgBBD8ASFgAsQWlyqL0CJGgMIOUYxSNVFD3dhOg1KJ+Kfte+/z+RRHoeeheu4PK4CI3BpjzpVSe20AjTHfSqlnkncu/RqAiDwCuHQJPdefSF417bUBzAHsZ1l2nKbpu2ej2rYoio601oX2i+QoFMAUApJb5UNEvOrYHPASupzZOQARmS6dPV2FdzqwFI4dJ56RrBX+7cAmR3wAXgHUiltgpiTPVuc7A3Dd9ab1AaAzBzxDWN5EFcYuAXxCWAJUYewMYAhh7w4MIez9Cv4lwCeAUZ7n48lk8tbGgSiKTrTWMwBzkgdFjZDn+B7AdZvGFs0DyUUtb4BicxzHN0qpCwCHLUE+jDEvSZIUh1mMIICWTRtlvQLYMlHSev16B34Nm5yoMhEKEPIk2wDWMhEE8BeZ2BmAHzDWSjCpN49mAAAAAElFTkSuQmCC'

export default class extends Component {
    constructor() {
        super()
        this.state = {
            options: beautify.js(
                "{xAxis: {type: 'category',data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},yAxis: {type: 'value'},series: [{data: [820, 932, 901, 934, 1290, 1330, 1320],type: 'line'}]}",
                opts
            ),
            jsx: '',
            modules: [],
            vars: []
        }
    }
    componentDidMount() {
        this.transformation()
        new ClipboardJS('.copy')
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
        } else {
            this.setState({
                err: err.message
            })
            return false
        }
        return this.toJSX(options, tagName)
    }
    handleChange = value => {
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
                jsx: beautify.html(this.toJSX(), opts),
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
        const importModules = `import { Recharts, Components } from 'react-component-echarts'\nconst { ${modules.join(', ')} } = Components`
        return (
            <div className="tools-container">
                <div className="tools-header">
                    <h2>React Component Echarts Tool</h2>
                    <p>组件式百度图表辅助工具</p>
                </div>
                <div className="editor-container">
                    <div className="editor-wrap">
                        <AceEditor
                            className="ace-editor"
                            mode="python"
                            theme="solarized_light"
                            width="100%"
                            fontSize={14}
                            onChange={this.handleChange}
                            value={this.state.options}
                        />
                    </div>
                    <div className="editor-wrap">
                        <img className="copy" src={copy} alt="copy" data-clipboard-text={importModules} />
                        <img className="copy" src={copy} alt="copy" style={{ top: 205 }} data-clipboard-text={jsx} />
                        <AceEditor
                            mode="jsx"
                            width="100%"
                            height="180px"
                            fontSize={14}
                            className="ace-editor"
                            theme="solarized_light"
                            readOnly
                            value={modules.length > 0 ? importModules : ''}
                        />
                        <AceEditor
                            readOnly
                            fontSize={14}
                            width="100%"
                            height="300px"
                            mode="jsx"
                            className="ace-editor"
                            theme="solarized_light"
                            value={jsx}
                        />
                    </div>
                </div>
                {vars && vars.length > 0 && (
                    <p className="vars-wrap">
                        请替换图表代码中以下字符串为真实变量:{' '}
                        {vars.map((v, k) => (
                            <span key={`vars-${k}`}>{v}</span>
                        ))}
                    </p>
                )}
                {err && (
                    <p className="err-wrap">
                        请检查配置代码并手动处理以下错误: <span>{err}</span>
                    </p>
                )}
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
