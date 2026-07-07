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

  const links = buildNearbyLinks(data, 38);

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
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        polyline: false,
        data: links.map((l) => ({ coords: [l[0], l[1]] })),
        lineStyle: {
          width: 1.2,
          opacity: 0.55,
          curveness: 0.25,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: '#00f0ff' },
            { offset: 0.5, color: '#6366f1' },
            { offset: 1, color: '#ec4899' }
          ])
        },
        effect: {
          show: true,
          period: 4,
          trailLength: 0.7,
          symbol: 'arrow',
          symbolSize: 4,
          color: '#ffffff'
        },
        z: 1
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: scatterData,
        symbolSize: 12,
        showEffectOn: 'render',
        rippleEffect: { brushType: 'stroke', scale: 3 },
        itemStyle: { color: '#ec4899', shadowBlur: 10, shadowColor: '#ec4899' },
        label: { show: false },
        z: 2
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
        z: 3
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function buildNearbyLinks(data: ScatterPoint[], threshold: number): Array<[[number, number], [number, number]]> {
  const links: Array<[[number, number], [number, number]]> = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const [x1, y1] = data[i].value;
      const [x2, y2] = data[j].value;
      const dist = Math.hypot(x2 - x1, y2 - y1);
      if (dist <= threshold) {
        links.push([[x1, y1], [x2, y2]]);
      }
    }
  }
  return links;
}
