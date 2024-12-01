// 柱状图组件
//1.把功能组件都放到该组件中
//2.把可变的部分抽象成prop参数

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
const BarChart = ({data}) => {

  const chartRef = useRef(null)
  useEffect(() => {
    //保证dom可用, 再完成图表渲染
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: data.title
      },
      xAxis: {
        type: 'category',
        // data: ['Vue', 'React', 'Angular']
        data: data.xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          // data: [10, 40, 70],
          data: data.yData,
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }, [])

  return (
    <div ref={chartRef} style={{ width: '500px', height: '400px' }}>
    </div>
  )
}

export default BarChart