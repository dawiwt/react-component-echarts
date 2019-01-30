import React, { Component } from 'react'
import { render } from 'react-dom'
import { Recharts, Components } from 'react-echarts'

const { Title, Legend, Tooltip, AxisPointer, Label, Toolbox, Feature, Grid, XAxis, YAxis, Series } = Components

class Root extends Component {
    constructor() {
        super()
        this.chartRef = React.createRef()
        this.state = {
            time: Date.now(),
            legend: ['邮件营销', '联盟广告', '视频广告', '直接访问']
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: Date.now()
            })
        }, 2000)
        setTimeout(() => {
            this.setState({
                legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            })
        }, 5000)
    }
    render() {
        return (
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
                <h2>图表</h2>
                <Recharts ref={this.chartRef} style={{ height: '50%' }}>
                    <Title text="堆叠区域图" />
                    <Tooltip trigger="axis">
                        <AxisPointer type="cross">
                            <Label backgroundColor="#6a7985" />
                        </AxisPointer>
                    </Tooltip>
                    <Legend data={this.state.legend} />
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
            </div>
        )
    }
}

render(<Root />, document.querySelector('#root'))
