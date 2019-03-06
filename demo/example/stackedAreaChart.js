import React, { Component } from 'react'
import { Recharts, Components } from 'react-echarts'

const { Title, Legend, Tooltip, AxisPointer, Label, Toolbox, Feature, Grid, XAxis, YAxis, Series } = Components

export default class extends Component {
    render() {
        return (
            <Recharts>
                <Title text="堆叠区域图" />
                <Tooltip trigger="axis">
                    <AxisPointer type="cross">
                        <Label backgroundColor="#6a7985" />
                    </AxisPointer>
                </Tooltip>
                <Legend data={['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']} />
                <Toolbox>
                    <Feature saveAsImage={{}} />
                </Toolbox>
                <Grid left="3%" right="4%" bottom="3%" containLabel={true} />
                <XAxis type="category" boundaryGap={false} data={['周一', '周二', '周三', '周四', '周五', '周六', '周日']} />
                <YAxis type="value" />
                <Series name="邮件营销" type="line" stack="总量" areaStyle={{}} data={[120, 132, 101, 134, 90, 230, 210]} />
                <Series name="联盟广告" type="line" stack="总量" areaStyle={{}} data={[220, 182, 191, 234, 290, 330, 310]} />
                <Series name="视频广告" type="line" stack="总量" areaStyle={{}} data={[150, 232, 201, 154, 190, 330, 410]} />
                <Series name="直接访问" type="line" stack="总量" areaStyle={{ normal: {} }} data={[320, 332, 301, 334, 390, 330, 320]} />
                <Series name="搜索引擎" type="line" stack="总量" areaStyle={{ normal: {} }} data={[820, 932, 901, 934, 1290, 1330, 1320]}>
                    <Label
                        normal={{
                            show: true,
                            position: 'top'
                        }}
                    />
                </Series>
            </Recharts>
        )
    }
}
