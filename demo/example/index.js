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
        component: Line
    },
    Marker: {
        type: 'marker',
        title: '标记',
        component: Marker
    },
    Bar: {
        type: 'bar',
        title: '柱状图',
        component: Bar
    },
    BarPolar: {
        type: 'bar-polar',
        title: '柱状极坐标',
        component: BarPolar
    },
    Pie: {
        type: 'pie',
        title: '饼图',
        component: Pie
    },
    Scatter: {
        type: 'scatter',
        title: '散点图',
        component: Scatter
    },
    TheMap: {
        type: 'map',
        title: '地图',
        component: TheMap
    }
}
