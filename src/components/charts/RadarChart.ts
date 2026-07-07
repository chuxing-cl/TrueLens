import * as echarts from 'echarts';

export function createRadarChart(container: HTMLElement, axes: Array<{ name: string; max: number }>, data: number[]) {
  const chart = echarts.init(container, 'dark');
  const indicator = axes.map(a => ({ name: a.name, max: a.max }));
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    radar: {
      indicator,
      splitNumber: 4,
      axisName: { color: '#8aa3d9', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(30,42,74,0.8)' } },
      splitArea: { areaStyle: { color: ['rgba(0,240,255,0.02)', 'rgba(0,240,255,0.05)'] } },
      axisLine: { lineStyle: { color: 'rgba(30,42,74,0.8)' } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: data,
          name: '当前指标',
          lineStyle: { color: '#00f0ff', width: 2 },
          areaStyle: { color: 'rgba(0,240,255,0.25)' },
          itemStyle: { color: '#00f0ff' }
        }
      ]
    }]
  };
  chart.setOption(option);
  return chart;
}
