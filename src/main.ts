import './styles/main.css';
import { Router } from './router';
import * as echarts from 'echarts';
import './utils/audio';
import './utils/splash';
import { playBgm } from './utils/audio';

echarts.registerTheme('dark', {
  backgroundColor: 'transparent',
  textStyle: { color: '#e6f0ff' },
  title: { textStyle: { color: '#00f0ff' } },
  legend: { textStyle: { color: '#8aa3d9' } },
  categoryAxis: { axisLine: { lineStyle: { color: '#1e2a4a' } }, axisLabel: { color: '#8aa3d9' }, splitLine: { lineStyle: { color: 'rgba(30,42,74,0.8)' } } },
  valueAxis: { splitLine: { lineStyle: { color: 'rgba(30,42,74,0.8)' } }, axisLabel: { color: '#8aa3d9' } }
});

async function initApp() {
  const splash = document.getElementById('splash');
  if (splash) {
    await new Promise<void>((resolve) => {
      const handler = () => {
        splash.removeEventListener('click', handler);
        splash.removeEventListener('touchstart', handler);
        playBgm();
        resolve();
      };
      splash.addEventListener('click', handler);
      splash.addEventListener('touchstart', handler);
    });
  }

  const router = new Router();
  router.add({ hash: '/', render });
  router.start();
}

function render() {
  import('./pages/dashboard/index').then((mod) => {
    mod.renderDashboard();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
