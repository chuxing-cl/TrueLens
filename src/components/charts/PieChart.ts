import * as echarts from 'echarts';

export function createPieChart(container: HTMLElement, data: Array<{ name: string; value: number }>) {
  const chart = echarts.init(container, 'dark');
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: 'rgba(5,11,31,0.9)', borderColor: '#00f0ff', textStyle: { color: '#e6f0ff' } },
    legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#8aa3d9', fontSize: 11 } },
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['40%', '50%'],
      data,
      emphasis: { label: { show: true, color: '#fff', fontSize: 14 } },
      label: { show: false },
      itemStyle: { borderColor: '#050b1f', borderWidth: 2 }
    }]
  };
  chart.setOption(option);
  return chart;
}
