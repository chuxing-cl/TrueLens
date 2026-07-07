import type { MockDataResponse } from '../types/mock';

const REGIONS = ['北京','上海','广州','深圳','杭州','成都','武汉','西安','南京','重庆','苏州','天津','长沙','郑州','青岛'];
const CATEGORIES = ['电子','服装','食品','家居','美妆','图书','运动','母婴','汽车','医药'];

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}

function trendGen(base: number, volatility: number, points: number): number[] {
  const arr: number[] = [];
  let cur = base;
  for (let i = 0; i < points; i++) {
    arr.push(cur);
    cur = cur + rand(-volatility, volatility);
    if (cur < 0) cur = 0;
  }
  return arr;
}

function daysLabels(count: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    dates.push(`${d.getMonth()+1}/${d.getDate()}`);
  }
  return dates;
}

let idCounter = 0;
function _genRealtime(count: number) {
  const records = [];
  const metrics = ['访客数','订单量','支付金额','转化率','客单价','退单量'];
  const statuses: Array<'success'|'warning'|'error'> = ['success','success','success','warning','error'];
  for (let i = 0; i < count; i++) {
    idCounter++;
    const t = new Date(Date.now() - i * 3000);
    records.push({
      id: idCounter,
      timestamp: `${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}:${String(t.getSeconds()).padStart(2,'0')}`,
      region: pick(REGIONS),
      metric: pick(metrics),
      value: rand(1, 9999),
      status: pick(statuses)
    } as any);
  }
  return records;
}

export function generateMockData(): MockDataResponse {
  const trend = daysLabels(30);
  const base1 = trendGen(rand(2000,4000), 500, 30);
  const base2 = trendGen(rand(1500,3000), 400, 30);

  return {
    kpis: [
      { title: '今日营收', value: rand(500000, 1200000), unit: '元', change: randFloat(-5, 15), trend: randFloat(-0.05, 0.05) > 0 ? 'up' : 'down', icon: '💰' },
      { title: '总用户数', value: rand(80000, 150000), unit: '人', change: randFloat(0, 8), trend: 'up', icon: '👥' },
      { title: '转化率', value: randFloat(2, 8), unit: '%', change: randFloat(-1, 2), trend: randFloat(-0.02, 0.02) > 0 ? 'up' : 'down', icon: '📈' },
      { title: '活跃度', value: rand(3000, 8000), unit: '人', change: randFloat(-3, 10), trend: 'up', icon: '🔥' },
      { title: '订单量', value: rand(10000, 30000), unit: '笔', change: randFloat(-2, 12), trend: 'up', icon: '📦' },
      { title: '客单价', value: randFloat(80, 300), unit: '元', change: randFloat(-1, 3), trend: randFloat(-0.02, 0.02) > 0 ? 'up' : 'down', icon: '💳' }
    ],
    trend: trend.map((date, i) => ({ date, value: base1[i], value2: base2[i] })),
    bars: CATEGORIES.slice(0, 8).map(cat => ({ name: cat, value: rand(1000, 10000) })),
    pies: CATEGORIES.slice(0, 6).map(cat => ({ name: cat, value: rand(500, 5000) })),
    radarAxes: [
      { name: '性能', max: 100 },
      { name: '稳定性', max: 100 },
      { name: '安全性', max: 100 },
      { name: '扩展性', max: 100 },
      { name: '易用性', max: 100 },
      { name: '兼容性', max: 100 }
    ],
    radarValue: [rand(70,95), rand(80,98), rand(75,95), rand(65,90), rand(70,95), rand(75,92)],
    radar: { axes: [], data: [] },
    gaugeValue: rand(75, 98),
    gauge: rand(75, 98),
    realtime: _genRealtime(8),
    scatter: REGIONS.slice(0, 12).map(r => ({
      name: r,
      value: [rand(80, 150), rand(20, 90), rand(1000, 5000)] as [number, number, number]
    })),
    notifications: [
      '系统运行正常',
      '数据同步完成',
      '新增订单预警：华南区域高峰',
      '服务器负载正常',
      '数据库备份完成',
      '新用户注册量环比上升 12%'
    ]
  };
}
