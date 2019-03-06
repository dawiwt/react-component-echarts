import React from 'react'
import { Recharts, Components } from 'react-echarts'
const { Label, Title, Tooltip, VisualMap, Series } = Components

export default function() {
    return (
        <Recharts backgroundColor="#2c343c">
            <Title text="Customized Pie" left="center" top={20} textStyle={{ color: '#ccc' }} />
            <Tooltip trigger="item" formatter="{a} <br/>{b} : {c} ({d}%)" />
            <VisualMap show={false} min={80} max={600} inRange={{ colorLightness: [0, 1] }} />
            <Series
                name="访问来源"
                type="pie"
                radius="55%"
                center={['50%', '50%']}
                data={[
                    { value: 235, name: '视频广告' },
                    { value: 274, name: '联盟广告' },
                    { value: 310, name: '邮件营销' },
                    { value: 335, name: '直接访问' },
                    { value: 400, name: '搜索引擎' }
                ]}
                roseType="radius"
                labelLine={{ normal: { lineStyle: { color: 'rgba(255, 255, 255, 0.3)' }, smooth: 0.2, length: 10, length2: 20 } }}
                itemStyle={{ normal: { color: '#c23531', shadowBlur: 200, shadowColor: 'rgba(0, 0, 0, 0.5)' } }}
                animationType="scale"
                animationEasing="elasticOut"
                animationDelay={function(idx) {
                    return Math.random() * 200
                }}>
                <Label normal={{ textStyle: { color: 'rgba(255, 255, 255, 0.3)' } }} />
            </Series>
        </Recharts>
    )
}
