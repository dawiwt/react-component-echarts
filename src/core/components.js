import React, { PureComponent, isValidElement } from 'react'
import mergeOptions from '../utils/mergeOptions'
import isEqual from '../utils/isEqual'

class BaseComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.options = {
            __rechartId: `ec-${Date.now() + Math.ceil(Math.random() * 10000)}`
        }
    }
    componentDidMount() {
        this.handlePushOption()
    }
    componentDidUpdate(preProps) {
        if (!isEqual(this.props, preProps, { exclude: ['children', 'triggerPushOption'] })) {
            this.handlePushOption()
        }
    }
    handlePushOption = () => {
        const { triggerPushOption, children, ...props } = this.props
        if (triggerPushOption) {
            triggerPushOption(this.name, Object.assign({}, props, this.options))
        }
    }
    handleReceiveChildOption = (name, option) => {
        const newOption = mergeOptions(this.options[name], option)
        if (newOption) {
            this.options[name] = newOption
            this.handlePushOption()
        }
    }
    render() {
        if (this.props.children) {
            return React.Children.map(this.props.children, children => {
                if (isValidElement(children)) {
                    return React.cloneElement(children, {
                        triggerPushOption: this.handleReceiveChildOption
                    })
                }
                return children
            })
        }
        //虚拟结点，不返回真实 DOM
        return null
    }
}

// 创建子元素
export function createComponent(compont) {
    return class extends BaseComponent {
        constructor() {
            super()
            this.name = compont
        }
    }
}

export default [
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
].reduce(
    (memo, next) =>
        Object.assign(
            {
                [next.replace(/^\S/, function(s) {
                    return s.toUpperCase()
                })]: createComponent(next)
            },
            memo
        ),
    {}
)
