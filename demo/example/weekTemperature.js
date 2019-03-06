import React from 'react'
import { Recharts, Components } from 'react-echarts'
const { DataZoom, Feature, AxisLabel, MarkLine, Title, Tooltip, Legend, Toolbox, XAxis, YAxis, Series } = Components

export default function() {
    return (
        <Recharts>
            <Title text="未来一周气温变化" subtext="纯属虚构" />
            <Tooltip trigger="axis" />
            <Legend data={['最高气温', '最低气温']} />
            <Toolbox show={true}>
                <Feature dataView={{ readOnly: false }} magicType={{ type: ['line', 'bar'] }} restore={{}} saveAsImage={{}}>
                    <DataZoom yAxisIndex="none" />
                </Feature>
            </Toolbox>
            <XAxis type="category" boundaryGap={false} data={['周一', '周二', '周三', '周四', '周五', '周六', '周日']} />
            <YAxis type="value">
                <AxisLabel formatter="{value} °C" />
            </YAxis>
            <Series
                name="最高气温"
                type="line"
                data={[11, 11, 15, 13, 12, 13, 10]}
                markPoint={{ data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }] }}>
                <MarkLine data={[{ type: 'average', name: '平均值' }]} />
            </Series>
            <Series
                name="最低气温"
                type="line"
                data={[1, -2, 2, 5, 3, 2, 0]}
                markPoint={{ data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }] }}>
                <MarkLine
                    data={[
                        { type: 'average', name: '平均值' },
                        [
                            { symbol: 'none', x: '90%', yAxis: 'max' },
                            { symbol: 'circle', label: { normal: { position: 'start', formatter: '最大值' } }, type: 'max', name: '最高点' }
                        ]
                    ]}
                />
            </Series>
        </Recharts>
    )
}
