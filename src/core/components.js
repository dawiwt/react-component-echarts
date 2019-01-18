import React, { PureComponent } from 'react'
import mergeOptions from '../utils/mergeOptions'

class BaseComponent extends PureComponent {
    constructor() {
        super()
        this.name = ''
        this.option = {}
        this.id = `ec-${Date.now() + Math.ceil(Math.random() * 10000)}`
    }
    componentDidMount() {
        this.handlePushUpOption()
    }
    componentDidUpdate() {
        this.handlePushUpOption()
    }
    handlePushUpOption = () => {
        const { pushUpOption, children, ...props } = this.props
        if (pushUpOption) {
            pushUpOption(
                this.name.replace(/^\S/, function(s) {
                    return s.toLowerCase()
                }),
                Object.assign({ id: this.id }, props, this.option)
            )
        }
    }
    handleChildPushUpOption = (name, option) => {
        mergeOptions(this.option, name, option)
        this.handlePushUpOption()
    }
    render() {
        if (this.props.children) {
            return React.Children.map(this.props.children, children => {
                if (typeof children === 'object') {
                    return React.cloneElement(children, {
                        pushUpOption: this.handleChildPushUpOption
                    })
                }
                return children
            })
        }
        //虚拟结点，不返回真实 DOM
        return null
    }
}

export default ['Title', 'Legend', 'Tooltip', 'AxisPointer', 'Label', 'Toolbox', 'Feature', 'Grid', 'XAxis', 'YAxis', 'Series'].reduce(
    (memo, next) =>
        Object.assign(
            {
                [next]: class extends BaseComponent {
                    constructor() {
                        super()
                        this.name = next
                    }
                }
            },
            memo
        ),
    {}
)
