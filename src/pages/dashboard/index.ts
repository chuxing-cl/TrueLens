import './themes';
import './layout';

import { DashboardModule } from '../../store/modules/dashboard';
import { ChartDataModule } from '../../store/modules/chartData';
import { el } from '../../utils/dom';
import { createLineChart } from '../../components/charts/LineChart';
import { createBarChart } from '../../components/charts/BarChart';
import { createPieChart } from '../../components/charts/PieChart';
import { createRadarChart } from '../../components/charts/RadarChart';
import { createGaugeChart } from '../../components/charts/GaugeChart';
import { createMapChart } from '../../components/charts/MapChart';
import { formatNumber, formatPercent, formatTimeShort } from '../../utils/formatter';
import { toggleBgm } from '../../utils/audio';
import { ParticleBackground } from '../../utils/particleBackground';

const dashboard = new DashboardModule();
const chartData = new ChartDataModule();
const chartInstances: any[] = [];

export function renderDashboard() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';

  new ParticleBackground(app, 100);

  const screenWrap = el('div', { class: 'screen-wrap' });
  app.appendChild(screenWrap);

  const header = buildHeader();
  screenWrap.appendChild(header);

  const kpiRow = buildKpiRow();
  screenWrap.appendChild(kpiRow);

  const mainGrid = buildMainGrid();
  screenWrap.appendChild(mainGrid);

  const footer = buildFooter();
  screenWrap.appendChild(footer);

  dashboard.subscribe(() => {
    const timeEl = document.getElementById('app-time');
    if (timeEl) timeEl.textContent = dashboard.currentTime;
  });

  chartData.subscribe(() => {
    if (!chartData.loading && chartData.data) {
      updateCharts(chartData.data);
    }
  });

  chartData.fetchAll().then(() => {
    setInterval(() => {
      chartData.invalidate();
      chartData.fetchAll();
    }, dashboard.refreshInterval);
  });

  setInterval(() => dashboard.tick(), 1000);
  dashboard.tick();

  window.addEventListener('resize', scaleScreen);
  
  chartData.fetchAll().then(() => {
    setInterval(() => {
      chartData.invalidate();
      chartData.fetchAll();
    }, dashboard.refreshInterval);
  });

  const ro = new ResizeObserver(() => scaleScreen());
  ro.observe(document.querySelector('.main-grid') as Element);
  
  setInterval(() => dashboard.tick(), 1000);
  dashboard.tick();
}

function buildHeader(): HTMLElement {
  const header = el('div', { class: 'header' });
  const title = el('div', { class: 'header-title' }, 'TrueLens 数据可视化大屏');
  header.appendChild(title);
  const deco = el('div', { class: 'header-deco' });
  header.appendChild(deco);
  const timeEl = el('div', { id: 'app-time' });
  timeEl.style.cssText = 'position:absolute;right:40px;top:50%;transform:translateY(-50%);color:#8aa3d9;font-family:Orbitron,sans-serif;font-size:14px;';
  header.appendChild(timeEl);
  const audioBtn = el('button', { id: 'audio-toggle', class: 'audio-btn', title: '背景音乐' }, '🔊');
  audioBtn.addEventListener('click', async () => {
    const on = await toggleBgm();
    audioBtn.textContent = on ? '🔊' : '🔇';
  });
  header.appendChild(audioBtn);
  return header;
}

function buildKpiRow(): HTMLElement {
  const row = el('div', { class: 'kpi-row' });
  renderKpis(row, chartData.data.kpis || []);
  chartData.subscribe(() => {
    if (chartData.data.kpis && chartData.data.kpis.length > 0) {
      renderKpis(row, chartData.data.kpis);
    }
  });
  return row;
}

function renderKpis(row: HTMLElement, kpis: any[]) {
  row.innerHTML = '';
  for (let i = 0; i < kpis.length; i++) {
    const card = buildKpiCard(kpis[i], i);
    row.appendChild(card);
  }
  animateKpis();
}

function buildKpiCard(kpi: any, index: number): HTMLElement {
  const card = document.createElement('div');
  card.className = 'kpi-card';
  (card as HTMLElement).style.animationDelay = `${index * 0.05}s`;
  card.innerHTML = `
    <div style="font-size:18px;margin-bottom:6px;">${kpi.icon}</div>
    <div class="value" data-target="${kpi.value}" data-unit="${kpi.unit}">0</div>
    <div class="label">${kpi.title}</div>
    <div class="change ${kpi.trend}">${kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'} ${formatPercent(kpi.change)}</div>
  `;
  return card as HTMLElement;
}

function animateKpis() {
  document.querySelectorAll('.kpi-card .value').forEach((el) => {
    const target = Number((el as HTMLElement).dataset.target || '0');
    const unit = (el as HTMLElement).dataset.unit || '';
    const duration = 1200;
    const start = performance.now();
    function step(ts: number) {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNumber(target * eased) + (progress >= 1 ? unit : '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

function buildMainGrid(): HTMLElement {
  const grid = document.createElement('div');
  grid.className = 'main-grid';

  const leftCol = document.createElement('div');
  const leftContainer1 = document.createElement('div');
  leftContainer1.className = 'panel';
  leftContainer1.innerHTML = '<div class="panel-title">📊 销售趋势</div><div id="chart-trend" class="chart-container"></div>';
  const leftContainer2 = document.createElement('div');
  leftContainer2.className = 'panel';
  leftContainer2.innerHTML = '<div class="panel-title">🍩 品类占比</div><div id="chart-pie" class="chart-container"></div>';
  leftCol.appendChild(leftContainer1);
  leftCol.appendChild(leftContainer2);

  const centerCol = document.createElement('div');
  const centerContainer1 = document.createElement('div');
  centerContainer1.className = 'panel';
  centerContainer1.innerHTML = '<div class="panel-title">📈 销售对比</div><div id="chart-bar" class="chart-container"></div>';
  const centerContainer2 = document.createElement('div');
  centerContainer2.className = 'panel';
  centerContainer2.innerHTML = '<div class="panel-title">🗺️ 区域分布</div><div id="chart-scatter" class="chart-container"></div>';
  centerCol.appendChild(centerContainer1);
  centerCol.appendChild(centerContainer2);

  const rightCol = document.createElement('div');
  const rightContainer1 = document.createElement('div');
  rightContainer1.className = 'panel';
  rightContainer1.innerHTML = '<div class="panel-title">🕸️ 能力评估</div><div id="chart-radar" class="chart-container"></div>';
  const rightContainer2 = document.createElement('div');
  rightContainer2.className = 'panel';
  rightContainer2.innerHTML = '<div class="panel-title">⏱️ 满意度</div><div id="chart-gauge" class="chart-container"></div>';
  rightCol.appendChild(rightContainer1);
  rightCol.appendChild(rightContainer2);

  grid.appendChild(leftCol);
  grid.appendChild(centerCol);
  grid.appendChild(rightCol);
  return grid;
}

function buildFooter(): HTMLElement {
  const footer = document.createElement('div');
  footer.className = 'footer';
  const marquee = document.createElement('div');
  marquee.className = 'marquee';
  chartData.subscribe(() => {
    if (chartData.data.notifications) {
      marquee.innerHTML = '';
      const txt = chartData.data.notifications.join('     ');
      for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        span.textContent = txt;
        marquee.appendChild(span);
      }
    }
  });
  footer.appendChild(marquee);
  return footer as HTMLElement;
}

function updateCharts(data: any) {
  if (data.trend) {
    const trendEl = document.getElementById('chart-trend');
    if (trendEl && !chartInstances[0]) {
      const labels = data.trend.map((t: any) => t.date);
      const v1 = data.trend.map((t: any) => t.value);
      const v2 = data.trend.map((t: any) => t.value2);
      chartInstances[0] = createLineChart(trendEl, labels, v1, v2);
    } else if (chartInstances[0]) {
      chartInstances[0].setOption({
        xAxis: { data: data.trend.map((t: any) => t.date) },
        series: [
          { data: data.trend.map((t: any) => t.value) },
          { data: data.trend.map((t: any) => t.value2) }
        ]
      });
    }
  }

  if (data.bars) {
    const barEl = document.getElementById('chart-bar');
    if (barEl && !chartInstances[1]) {
      chartInstances[1] = createBarChart(barEl, data.bars.map((b: any) => b.name), data.bars.map((b: any) => b.value));
    }
  }

  if (data.pies) {
    const pieEl = document.getElementById('chart-pie');
    if (pieEl && !chartInstances[2]) {
      chartInstances[2] = createPieChart(pieEl, data.pies);
    }
  }

  if (data.radar) {
    const radarEl = document.getElementById('chart-radar');
    if (radarEl && !chartInstances[3]) {
      chartInstances[3] = createRadarChart(radarEl, data.radar.axes, data.radar.data);
    }
  }

  if (data.gauge !== undefined) {
    const gaugeEl = document.getElementById('chart-gauge');
    if (gaugeEl && !chartInstances[4]) {
      chartInstances[4] = createGaugeChart(gaugeEl, data.gauge);
    } else if (chartInstances[4]) {
      chartInstances[4].setOption({ series: [{ data: [{ value: data.gauge }] }] });
    }
  }

  if (data.scatter) {
    const scatterEl = document.getElementById('chart-scatter');
    if (scatterEl && !chartInstances[5]) {
      chartInstances[5] = createMapChart(scatterEl, data.scatter);
    }
  }

  animateKpis();
  const timeEl = document.getElementById('app-time');
  if (timeEl) timeEl.textContent = formatTimeShort(new Date());
  
  scaleScreen();
}

function scaleScreen() {
  const app = document.getElementById('app');
  if (!app) return;
  const wrap = app.querySelector('.screen-wrap') as HTMLElement | null;
  if (!wrap) return;

  const targetW = 1920;
  const targetH = 1080;
  const scaleX = window.innerWidth / targetW;
  const scaleY = window.innerHeight / targetH;
  const scale = Math.min(scaleX, scaleY);

  wrap.style.transformOrigin = 'left top';
  wrap.style.position = 'absolute';
  wrap.style.left = `${(window.innerWidth - targetW * scale) / 2}px`;
  wrap.style.top = `${(window.innerHeight - targetH * scale) / 2}px`;
  wrap.style.transform = `scale(${scale})`;

  for (const chart of chartInstances) {
    try { chart.resize(); } catch {}
  }
}