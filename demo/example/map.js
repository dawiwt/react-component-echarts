import React from 'react'
import { Recharts, Components } from 'react-echarts'
const { Feature, Label, Title, Tooltip, Legend, VisualMap, Toolbox, Series } = Components

export default function() {
    return (
        <Recharts>
            <Title text="iphone销量" subtext="纯属虚构" left="center" />
            <Tooltip trigger="item" />
            <Legend orient="vertical" left="left" data={['iphone3', 'iphone4', 'iphone5']} />
            <VisualMap min={0} max={2500} left="left" top="bottom" text={['高', '低']} calculable={true} />
            <Toolbox show={true} orient="vertical" left="right" top="center">
                <Feature mark={{ show: true }} dataView={{ show: true, readOnly: false }} restore={{ show: true }} saveAsImage={{ show: true }} />
            </Toolbox>
            <Series
                name="iphone3"
                type="map"
                mapType="china"
                roam={false}
                data={[
                    { name: '北京', value: 873 },
                    { name: '天津', value: 462 },
                    { name: '上海', value: 100 },
                    { name: '重庆', value: 795 },
                    { name: '河北', value: 704 },
                    { name: '河南', value: 73 },
                    { name: '云南', value: 318 },
                    { name: '辽宁', value: 176 },
                    { name: '黑龙江', value: 418 },
                    { name: '湖南', value: 254 },
                    { name: '安徽', value: 694 },
                    { name: '山东', value: 929 },
                    { name: '新疆', value: 456 },
                    { name: '江苏', value: 960 },
                    { name: '浙江', value: 687 },
                    { name: '江西', value: 283 },
                    { name: '湖北', value: 490 },
                    { name: '广西', value: 186 },
                    { name: '甘肃', value: 804 },
                    { name: '山西', value: 928 },
                    { name: '内蒙古', value: 476 },
                    { name: '陕西', value: 830 },
                    { name: '吉林', value: 281 },
                    { name: '福建', value: 167 },
                    { name: '贵州', value: 493 },
                    { name: '广东', value: 813 },
                    { name: '青海', value: 960 },
                    { name: '西藏', value: 129 },
                    { name: '四川', value: 885 },
                    { name: '宁夏', value: 535 },
                    { name: '海南', value: 215 },
                    { name: '台湾', value: 846 },
                    { name: '香港', value: 643 },
                    { name: '澳门', value: 819 }
                ]}>
                <Label normal={{ show: false }} emphasis={{ show: true }} />
            </Series>
            <Series
                name="iphone4"
                type="map"
                mapType="china"
                data={[
                    { name: '北京', value: 446 },
                    { name: '天津', value: 521 },
                    { name: '上海', value: 32 },
                    { name: '重庆', value: 190 },
                    { name: '河北', value: 450 },
                    { name: '安徽', value: 521 },
                    { name: '新疆', value: 442 },
                    { name: '浙江', value: 668 },
                    { name: '江西', value: 166 },
                    { name: '山西', value: 251 },
                    { name: '内蒙古', value: 548 },
                    { name: '吉林', value: 586 },
                    { name: '福建', value: 351 },
                    { name: '广东', value: 582 },
                    { name: '西藏', value: 669 },
                    { name: '四川', value: 225 },
                    { name: '宁夏', value: 97 },
                    { name: '香港', value: 5 },
                    { name: '澳门', value: 591 }
                ]}>
                <Label normal={{ show: false }} emphasis={{ show: true }} />
            </Series>
            <Series
                name="iphone5"
                type="map"
                mapType="china"
                data={[
                    { name: '北京', value: 586 },
                    { name: '天津', value: 196 },
                    { name: '上海', value: 26 },
                    { name: '广东', value: 171 },
                    { name: '台湾', value: 143 },
                    { name: '香港', value: 764 },
                    { name: '澳门', value: 598 }
                ]}>
                <Label normal={{ show: false }} emphasis={{ show: true }} />
            </Series>
        </Recharts>
    )
}
