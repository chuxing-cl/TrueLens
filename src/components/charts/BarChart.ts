import * as echarts from 'echarts';

export function createBarChart(container: HTMLElement, names: string[], values: number[]) {
  const chart = echarts.init(container, 'dark');
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(5,11,31,0.9)', borderColor: '#00f0ff', textStyle: { color: '#e6f0ff' } },
    grid: { left: 12, right: 12, top: 20, bottom: 20 },
    xAxis: { type: 'category', data: names, axisLine: { lineStyle: { color: '#1e2a4a' } }, axisLabel: { color: '#8aa3d9', fontSize: 10, rotate: 30 } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(30,42,74,0.8)' } }, axisLabel: { color: '#8aa3d9', fontSize: 10 } },
    series: [{
      type: 'bar',
      data: values.map(v => ({
        value: v,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00f0ff' },
            { offset: 1, color: 'rgba(0,240,255,0.1)' }
          ])
        }
      })),
      barWidth: '50%'
    }]
  };
  chart.setOption(option);
  return chart;
}