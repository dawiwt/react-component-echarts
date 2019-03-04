# React Component Echarts

组件式百度图表，示例 https://github.com/dawiwt/react-component-echarts

[![Build Status](https://api.travis-ci.org/dawiwt/react-component-echarts.svg?branch=master)](https://travis-ci.org/dawiwt/react-component-echarts) [![Coverage Status](https://coveralls.io/repos/github/dawiwt/react-component-echarts/badge.svg?branch=master)](https://coveralls.io/github/dawiwt/react-component-echarts?branch=master) [![npm](https://img.shields.io/npm/v/react-component-echarts.svg)](https://www.npmjs.com/package/react-component-echarts) [![npm](https://img.shields.io/npm/dw/react-component-echarts.svg?label=npm%20downloads&style=flat)](https://www.npmjs.com/package/react-component-echarts) [![npm](https://img.shields.io/npm/l/react-component-echarts.svg)](https://www.npmjs.com/package/react-component-echarts) ![echarts supported](https://img.shields.io/badge/echarts-%5E3.0.0%20%7C%7C%20%5E4.0.0-blue.svg) ![react supported](https://img.shields.io/badge/React-%20%5E15.0.0%20%7C%7C%20%20%5E16.0.0-blue.svg)

## Feature

-   组件式开发
-   图表自适应
-   功能完全兼容`echarts`本身功能
-   通过`Props`配置，学习、维护成本更低
-   支持[辅助工具](https://github.com/dawiwt/react-component-echarts)从配置到组件的快速转换，高效开发

## Install

```sh
#安装包
npm install react-component-echarts --save

#自主安装echarts
npm install echarts --save
```

## Usage

这里是一个简单示例，更多示例看这里 https://github.com/dawiwt/react-component-echarts

```js

//导入图表
import echarts from 'echarts/lib/echarts'

//导入组件
import { Recharts, Components } from 'react-component-echarts'
const { XAxis, YAxis, Series } = Components

//图表代码
<Recharts>
    <XAxis type="category" data={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} />
        <YAxis type="value" />
    <Series data={[820,932,901,934,1290,1330,1320]} type="line" smooth={true} />
</Recharts>

```

## Props

-   `className` (optional, string) 图表容器 `class` 名
-   `style` (optional, object) 图表容器样式
-   `onEvents` (optional, array) 绑定图表事件
-   `onLoad` (optional, function(Instance)) 图表首次加载完毕会执行 `onLoad`，`Instance` 为图表实例，可供调用百度图表 `API`

```js
<Recharts
    onEvents={[['click', params => console.log('click', params)], ['legendselectchanged', params => console.log('legendselectchanged', params)]]}>
    ...
</Recharts>
```

以上属性为`Recharts`节点仅有的几个`echarts`之外的属性，其它配置均为透传，无学习成本；

```js
//例如
;<XAxis type="category" />

//相当于
option = { xAxis: { type: 'category' } }
```

节点间的父子关系相当于对象间嵌套关系；

```js
//例如
;<Tooltip trigger="axis">
    <AxisPointer type="cross">
        <Label backgroundColor="#6a7985" />
    </AxisPointer>
</Tooltip>

//相当于
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    }
}
```

除此以外，图表`init`事件与`setOption`事件的参数可以通过`Recharts`透传，均非必传，不传为`echarts`默认值；

```js
// init
<Recharts theme="custom-theme" devicePixelRatio={window.devicePixelRatio} renderer="canvas" width={500} height={500}>...</Recharts>

// setOption
<Recharts notMerge={true} lazyUpdate={false} silent={true}>...</Recharts>
```

**特别说明：** 除`width`与`height`属性，其余的`init`与`setOption`属性会导致图表重绘。

更多属性查看 https://www.echartsjs.com/option.html

## LICENSE

MIT@[dawiwt](https://github.com/dawiwt)
