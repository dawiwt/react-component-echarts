import React, { Component, isValidElement } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import ctx from 'classnames'
import hashCode from '../utils/hashCode'
import debounce from '../utils/debounce'
import mergeOptions from '../utils/mergeOptions'

export default class extends Component {
    constructor() {
        super()
        this.count = 0
        this.option = {}
        this.domRef = React.createRef()
    }
    static propTypes = {
        // 详见 https://echarts.baidu.com/api.html#echartsInstance.setOption
        notMerge: PropTypes.bool, //可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并
        lazyUpdate: PropTypes.bool, //可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新
        silent: PropTypes.bool //可选，阻止调用 setOption 时抛出事件，默认为 false，即抛出事件
    }
    static defaultProps = {
        notMerge: false,
        lazyUpdate: false,
        silent: false
    }
    componentDidMount() {
        const { theme, devicePixelRatio, renderer, width, height } = this.props
        this.chart = echarts.init(this.domRef.current, theme, {
            devicePixelRatio,
            renderer,
            width,
            height
        })
        this.handleSetOption()
    }
    componentDidUpdate(preProps) {
        hashCode(preProps) !== hashCode(this.props) && this.handleSetOption()
    }
    handleSetOption = debounce(() => {
        const { notMerge, lazyUpdate, silent } = this.props
        console.log('this.option', this.option)
        this.chart.setOption(this.option, { notMerge, lazyUpdate, silent })
        this.count++
        console.log('渲染次数：', this.count)
    }, 100)
    handleReceiveChildOption = (name, option) => {
        mergeOptions(this.option, name, option) && this.handleSetOption()
    }
    render() {
        return (
            <div ref={this.domRef} className={ctx(this.props.className)} style={this.props.style}>
                {React.Children.map(this.props.children, children => {
                    if (isValidElement(children)) {
                        return React.cloneElement(children, {
                            triggerPushOption: this.handleReceiveChildOption
                        })
                    }
                    return children
                })}
            </div>
        )
    }
}
