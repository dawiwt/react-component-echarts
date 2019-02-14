import React, { Component } from 'react'
import { Recharts, Components } from 'react-echarts'
const { SplitLine, AxisLabel, Style, Children, LineStyle, Legend, Tooltip, Grid, XAxis, YAxis, Graphic, Series } = Components

export default class extends Component {
    constructor() {
        super()
        this.state = {
            rotation: (Math.PI / 360) % (Math.PI * 2)
        }
    }
    componentDidMount() {
        let rotation = 0
        // setTimeout(() => {
        setInterval(() => {
            this.setState({
                rotation: (rotation += Math.PI / 360) % (Math.PI * 2)
            })
        }, 30)
        // }, 1000)
    }
    render() {
        const { rotation } = this.state
        return (
            <Recharts ref={chart => (this.chart = chart)} color={['#8EC9EB']} style={{ height: '80%' }}>
                <Legend data={['高度(km)与气温(°C)变化关系']} />
                <Tooltip trigger="axis" formatter="Temperature : <br/>{b}km : {c}°C" />
                <Grid left="3%" right="4%" bottom="3%" containLabel={true} />
                <XAxis type="value">
                    <SplitLine show={false} />
                    <AxisLabel formatter="{value} °C" />
                </XAxis>
                <YAxis type="category" axisLine={{ onZero: false }} boundaryGap={true} data={['0', '10', '20', '30', '40', '50', '60', '70', '80']}>
                    <AxisLabel formatter="{value} km" />
                </YAxis>
                <Graphic type="image" id="logo" right={20} top={20} z={-10} rotation={rotation} bounding="raw" origin={[75, 75]}>
                    <Style image="http://echarts.baidu.com/images/favicon.png" width={150} height={150} opacity={0.4} />
                </Graphic>
                <Graphic type="group" rotation={0.7853981633974483} bounding="raw" right={110} bottom={110} z={100}>
                    <Children type="rect" left="center" top="center" z={100} shape={{ width: 400, height: 50 }}>
                        <Style fill="rgba(0,0,0,0.3)" />
                    </Children>
                    <Children type="text" left="center" top="center" z={100}>
                        <Style fill="#fff" text="ECHARTS BAR CHART" font="bold 26px Microsoft YaHei" />
                    </Children>
                </Graphic>
                <Graphic type="group" left="10%" top="center">
                    <Children type="rect" z={100} left="center" top="middle" shape={{ width: 190, height: 90 }}>
                        <Style
                            fill="#fff"
                            stroke="#555"
                            lineWidth={2}
                            shadowBlur={8}
                            shadowOffsetX={3}
                            shadowOffsetY={3}
                            shadowColor="rgba(0,0,0,0.3)"
                        />
                    </Children>
                    <Children type="text" z={100} left="center" top="middle">
                        <Style
                            fill="#333"
                            text={[
                                '横轴表示温度，单位是°C',
                                '纵轴表示高度，单位是km',
                                '右上角有一个图片做的水印',
                                '这个文本块可以放在图中各',
                                '种位置'
                            ].join('\n')}
                            font="14px Microsoft YaHei"
                        />
                    </Children>
                </Graphic>
                <Series
                    name="高度(km)与气温(°C)变化关系"
                    type="bar"
                    smooth={true}
                    barCategoryGap={25}
                    data={[15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]}>
                    <LineStyle normal={{ width: 3, shadowColor: 'rgba(0,0,0,0.4)', shadowBlur: 10, shadowOffsetY: 10 }} />
                </Series>
            </Recharts>
        )
    }
}
