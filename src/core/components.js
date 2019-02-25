import BaseComponent from './baseComponent'

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
