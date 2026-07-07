import * as echarts from 'echarts';

type ScatterPoint = {
  name: string;
  value: [number, number, number];
};

export function createMapChart(container: HTMLElement, data: ScatterPoint[]) {
  const chart = echarts.init(container, 'dark');
  const scatterData = data.map(item => ({
    name: item.name,
    value: item.value,
    symbolSize: Math.max(8, Math.min(30, item.value[2] / 200))
  }));

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(5,11,31,0.9)',
      borderColor: '#00f0ff',
      textStyle: { color: '#e6f0ff' },
      formatter: (params: any) => {
        if (params.data) {
          return `<b>${params.name}</b><br/>数值: ${params.data.value[2]}`;
        }
        return '';
      }
    },
    grid: { left: 10, right: 10, top: 10, bottom: 10 },
    xAxis: {
      type: 'value',
      min: 70,
      max: 160,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 15,
      max: 100,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: scatterData,
        symbolSize: 12,
        showEffectOn: 'render',
        rippleEffect: { brushType: 'stroke', scale: 3 },
        itemStyle: { color: '#ec4899', shadowBlur: 10, shadowColor: '#ec4899' },
        label: { show: false }
      },
      {
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        data: scatterData,
        symbolSize: (val: number[]) => Math.max(8, Math.min(30, val[2] / 200)),
        itemStyle: { color: '#00f0ff', opacity: 0.7 },
        label: {
          show: true,
          formatter: '{b}',
          position: 'top',
          fontSize: 10,
          color: '#e6f0ff'
        },
        z: 1
      }
    ]
  };

  chart.setOption(option);
  return chart;
}
