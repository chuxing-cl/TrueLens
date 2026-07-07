import * as echarts from 'echarts';

export function createGaugeChart(container: HTMLElement, value: number) {
  const chart = echarts.init(container, 'dark');
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    series: [{
      type: 'gauge',
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: 100,
      splitNumber: 10,
      itemStyle: { color: '#00f0ff' },
      progress: { show: true, width: 14, roundCap: true },
      pointer: { show: false },
      axisLine: { lineStyle: { width: 14, color: [[1, 'rgba(255,255,255,0.06)']] } },
      axisTick: { show: false },
      splitLine: { length: 6, lineStyle: { width: 2, color: '#8aa3d9' } },
      axisLabel: { distance: 20, color: '#8aa3d9', fontSize: 10 },
      anchor: { show: false },
      title: { show: false },
      detail: {
        valueAnimation: true,
        width: '80%',
        lineHeight: 40,
        height: 40,
        borderRadius: 8,
        offsetCenter: [0, '60%'],
        fontSize: 28,
        fontWeight: 'bolder',
        formatter: '{value}%',
        color: '#00f0ff'
      },
      data: [{ value }]
    }]
  };
  chart.setOption(option);
  return chart;
}
