import React, { PureComponent, isValidElement } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import ctx from 'classnames'
import debounce from 'debounce'
import { ResizeSensor } from 'css-element-queries'
import mergeOptions from '../utils/mergeOptions'
import isEqual from '../utils/isEqual'
import extract from '../utils/extract'

const sizeKeys = ['width', 'height']
const configKeys = ['theme', 'devicePixelRatio', 'renderer', 'notMerge', 'lazyUpdate', 'silent']
const notOptionsKeys = ['children', 'style'].concat(configKeys, sizeKeys)

export default class extends PureComponent {
    constructor() {
        super()
        this.state = {
            isLoaded: false
        }
        this.options = {}
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
        const { onLoad } = this.props
        this.chart = this.handleEchartsInit()
        this.handleSetOption()
        this.setState(
            {
                isLoaded: true
            },
            () => onLoad && onLoad(this.chart)
        )

        //监听 DOM 尺寸变化，并resize图表
        this.domResizeListen = new ResizeSensor(
            this.layout,
            debounce(
                () => {
                    this.chart.resize()
                },
                100,
                false
            )
        )
    }
    componentDidUpdate(preProps) {
        // 图表初始化属性更新，重绘图表
        if (
            !isEqual(this.props, preProps, {
                include: configKeys
            })
        ) {
            return this.handleEchartsReinit()
        }
        // 尺寸变更，resize图表
        if (
            !isEqual(this.props, preProps, {
                include: sizeKeys
            })
        ) {
            this.chart.resize()
        }
        // 图表配置更新，再次setOption
        if (!isEqual(this.props, preProps, { exclude: ['children'] })) {
            this.handleSetOption()
        }
    }
    componentWillUnmount() {
        this.chart.dispose()
        this.domResizeListen.detach()
    }
    handleEchartsInit = () => {
        const { theme, devicePixelRatio, renderer, width, height } = this.props
        return echarts.init(this.dom, theme, {
            devicePixelRatio,
            renderer,
            width,
            height
        })
    }
    handleEchartsReinit = () => {
        if (this.chart) {
            this.chart.dispose()
            this.chart = null
        }
        this.chart = this.handleEchartsInit()
        this.handleSetOption()
    }
    handleSetOption = () => {
        const { notMerge, lazyUpdate, silent } = this.props
        const options = extract(this.props, { exclude: notOptionsKeys })
        this.chart.setOption(Object.assign({}, options, this.options), { notMerge, lazyUpdate, silent })
    }
    // 接收子元素配置更新
    handleReceiveChildOption = (name, option) => {
        const newOptions = mergeOptions(this.options[name], option)
        if (newOptions) {
            this.options[name] = newOptions
            if (this.chart && this.state.isLoaded) {
                // 仅重新setOption变更部分
                this.chart.setOption({
                    [name]: newOptions
                })
            }
        }
    }
    render() {
        return (
            <div ref={layout => (this.layout = layout)} className={ctx(this.props.className)} style={this.props.style}>
                <div ref={dom => (this.dom = dom)} style={{ width: '100%', height: '100%' }}>
                    {React.Children.map(this.props.children, children => {
                        if (isValidElement(children)) {
                            return React.cloneElement(children, {
                                triggerPushOption: this.handleReceiveChildOption
                            })
                        }
                        return children
                    })}
                </div>
            </div>
        )
    }
}
