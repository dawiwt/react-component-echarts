import BaseComponent from './baseComponent'
import tagNames from '../../tags'

// 创建子元素
export function createComponent(compont) {
    return class extends BaseComponent {
        constructor() {
            super()
            this.name = compont
        }
    }
}

export default tagNames.reduce(
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
