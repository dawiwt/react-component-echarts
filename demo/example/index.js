import Area from './area'
import Line from './line'
import Marker from './marker'
import Bar from './bar'
import BarPolar from './barPolar'
import Pie from './pie'
import Scatter from './scatter'
import TheMap from './map'

export default {
    Area: {
        type: 'area',
        title: '区域图',
        component: Area,
        codesandboxKey: '6vrxylykjz'
    },
    Line: {
        type: 'line',
        title: '折线图',
        component: Line,
        codesandboxKey: 'v05wmq2j3'
    },
    Marker: {
        type: 'marker',
        title: '标记',
        component: Marker,
        codesandboxKey: 'k09rk8y8w5'
    },
    Bar: {
        type: 'bar',
        title: '柱状图',
        component: Bar,
        codesandboxKey: 'py17xnzw5m'
    },
    BarPolar: {
        type: 'bar-polar',
        title: '柱状极坐标',
        component: BarPolar,
        codesandboxKey: 'oj34w360vq'
    },
    Pie: {
        type: 'pie',
        title: '饼图',
        component: Pie,
        codesandboxKey: 'j4nk98wol3'
    },
    Scatter: {
        type: 'scatter',
        title: '散点图',
        component: Scatter,
        codesandboxKey: 'kwj0pkj7v7'
    },
    TheMap: {
        type: 'map',
        title: '地图',
        component: TheMap,
        codesandboxKey: 'k3q4qkn2qr'
    }
}
