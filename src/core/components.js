import React, { Component, isValidElement } from 'react'
import hashCode from '../utils/hashCode'
import mergeOptions from '../utils/mergeOptions'

class BaseComponent extends Component {
    constructor() {
        super()
        this.option = {}
        this.id = `ec-${Date.now() + Math.ceil(Math.random() * 10000)}`
    }
    componentDidMount() {
        this.name = this.name.replace(/^\S/, function(s) {
            return s.toLowerCase()
        })
        this.handlePushOption()
    }
    componentDidUpdate(preProps) {
        hashCode(preProps) !== hashCode(this.props) && this.handlePushOption()
    }
    handlePushOption = () => {
        const { triggerPushOption, children, ...props } = this.props
        triggerPushOption && triggerPushOption(this.name, Object.assign({ id: this.id }, props, this.option))
    }
    handleReceiveChildOption = (name, option) => {
        mergeOptions(this.option, name, option) && this.handlePushOption()
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

export function createComponent(compont) {
    return class extends BaseComponent {
        constructor() {
            super()
            this.name = compont
        }
    }
}

export default ['Title', 'Legend', 'Tooltip', 'AxisPointer', 'Label', 'Toolbox', 'Feature', 'Grid', 'XAxis', 'YAxis', 'Series'].reduce(
    (memo, next) =>
        Object.assign(
            {
                [next]: createComponent(next)
            },
            memo
        ),
    {}
)
