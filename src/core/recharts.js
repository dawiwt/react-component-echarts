import React, { PureComponent, isValidElement } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
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
        this.options = {}
        this.state = {
            isLoaded: false
        }
    }
    static propTypes = {
        notMerge: PropTypes.bool,
        lazyUpdate: PropTypes.bool,
        silent: PropTypes.bool,
        theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        devicePixelRatio: PropTypes.number,
        renderer: PropTypes.oneOf(['canvas', 'svg']),
        onEvents: PropTypes.arrayOf(PropTypes.array)
    }
    static defaultProps = {
        notMerge: false,
        lazyUpdate: false,
        silent: false
    }
    componentDidMount() {
        const { onLoad } = this.props
        this.chart = this.handleEchartsInit()
        this.handleBindEvent()
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
                    /**
                     * fix issues #3 https://github.com/dawiwt/react-component-echarts/issues/3
                     * 由于 componentWillUnmount 中先 dispose 图表
                     * 后 detach 的 domResizeListen
                     * 会造成图表销毁后，又触发了 DOM 尺寸变化监听事件的可能
                     * 所以，这里做个判断
                     */
                    if (this.chart && this.chart.resize) {
                        this.chart.resize()
                    }
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
        this.handleBindEvent()
        this.handleSetOption()
    }
    handleBindEvent = () => {
        const { onEvents } = this.props
        if (onEvents) {
            for (let i = 0, l = onEvents.length; i < l; i++) {
                this.chart.on.apply(this.chart, onEvents[i])
            }
        }
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
        const { width = '100%', height = '100%' } = this.props
        return (
            <div
                ref={layout => (this.layout = layout)}
                className={ctx('react-component-echarts', this.props.className)}
                style={Object.assign({ width, height }, this.props.style)}>
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
