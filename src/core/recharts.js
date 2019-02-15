import React, { PureComponent, isValidElement } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import ctx from 'classnames'
import mergeOptions from '../utils/mergeOptions'
import isEqual from '../utils/isEqual'

export default class extends PureComponent {
    constructor() {
        super()
        this.state = {
            isLoaded: false
        }
        this.options = {}
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
        const { theme, devicePixelRatio, renderer, width, height, onLoad } = this.props
        this.chart = echarts.init(this.domRef.current, theme, {
            devicePixelRatio,
            renderer,
            width,
            height
        })
        this.handleSetOption()
        this.setState(
            {
                isLoaded: true
            },
            () => onLoad && onLoad(this.chart)
        )
    }
    componentDidUpdate(preProps) {
        if (!isEqual(this.props, preProps, { exclude: ['children'] })) {
            this.handleSetOption()
        }
    }
    componentWillUnmount() {
        this.chart.dispose()
    }
    handleSetOption = () => {
        const { notMerge, lazyUpdate, silent } = this.props
        this.chart.setOption(this.options, { notMerge, lazyUpdate, silent })
    }
    handleReceiveChildOption = (name, option) => {
        const newOptions = mergeOptions(this.options[name], option)
        if (newOptions) {
            this.options[name] = newOptions
            if (this.chart && this.state.isLoaded) {
                this.chart.setOption({
                    [name]: newOptions
                })
            }
        }
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
