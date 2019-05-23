import React from 'react'

export default {
    Area: {
        type: 'area',
        title: '区域图',
        component: React.lazy(() => import(/* webpackChunkName: "area" */ './area.js')),
        codesandboxKey: '6vrxylykjz'
    },
    Line: {
        type: 'line',
        title: '折线图',
        component: React.lazy(() => import(/* webpackChunkName: "line" */ './line.js')),
        codesandboxKey: 'v05wmq2j3'
    },
    Marker: {
        type: 'marker',
        title: '标记',
        component: React.lazy(() => import(/* webpackChunkName: "marker" */ './marker.js')),
        codesandboxKey: 'k09rk8y8w5'
    },
    Bar: {
        type: 'bar',
        title: '柱状图',
        component: React.lazy(() => import(/* webpackChunkName: "bar" */ './bar.js')),
        codesandboxKey: 'py17xnzw5m'
    },
    BarPolar: {
        type: 'bar-polar',
        title: '柱状极坐标',
        component: React.lazy(() => import(/* webpackChunkName: "barPolar" */ './barPolar.js')),
        codesandboxKey: 'oj34w360vq'
    },
    Pie: {
        type: 'pie',
        title: '饼图',
        component: React.lazy(() => import(/* webpackChunkName: "pie" */ './pie.js')),
        codesandboxKey: 'j4nk98wol3'
    },
    Scatter: {
        type: 'scatter',
        title: '散点图',
        component: React.lazy(() => import(/* webpackChunkName: "scatter" */ './scatter.js')),
        codesandboxKey: 'kwj0pkj7v7'
    },
    TheMap: {
        type: 'map',
        title: '地图',
        component: React.lazy(() => import(/* webpackChunkName: "map" */ './map.js')),
        codesandboxKey: 'k3q4qkn2qr'
    }
}
