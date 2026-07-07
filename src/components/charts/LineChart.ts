import * as echarts from 'echarts';

export function createLineChart(container: HTMLElement, labels: string[], series1: number[], series2: number[]) {
  const chart = echarts.init(container, 'dark');
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(5,11,31,0.9)', borderColor: '#00f0ff', textStyle: { color: '#e6f0ff' } },
    legend: { data: ['销售额', '利润'], textStyle: { color: '#8aa3d9' }, top: 5, right: 10 },
    grid: { left: 12, right: 12, top: 40, bottom: 20 },
    xAxis: { type: 'category', data: labels, axisLine: { lineStyle: { color: '#1e2a4a' } }, axisLabel: { color: '#8aa3d9', fontSize: 10 } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(30,42,74,0.8)' } }, axisLabel: { color: '#8aa3d9', fontSize: 10 } },
    series: [
      { name: '销售额', type: 'line', smooth: true, data: series1, lineStyle: { color: '#00f0ff', width: 2 }, itemStyle: { color: '#00f0ff' }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(0,240,255,0.35)' },
        { offset: 1, color: 'rgba(0,240,255,0)' }
      ]) }, symbol: 'none' },
      { name: '利润', type: 'line', smooth: true, data: series2, lineStyle: { color: '#6366f1', width: 2 }, itemStyle: { color: '#6366f1' }, symbol: 'none' }
    ]
  };
  chart.setOption(option);
  return chart;
}