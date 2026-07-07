import { generateMockData } from './mock';

export class Fetcher {
  private baseUrl: string;
  private mockMode: boolean;
  private cache = new Map<string, { data: unknown; ts: number }>();
  private ttl = 5000;

  constructor(baseUrl = '/api', mockMode = true) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.mockMode = mockMode;
  }

  async request<T = unknown>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.ts < this.ttl) {
      return cached.data as T;
    }
    let data: T;
    if (this.mockMode) {
      data = (await this.mockFetch<T>(path)) as T;
    } else {
      data = await this.realFetch<T>(url);
    }
    this.cache.set(url, { data, ts: Date.now() });
    return data;
  }

  private async mockFetch<T>(path: string): Promise<T> {
    await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
    const all = generateMockData();
    if (path === '/kpi') return all.kpis as T;
    if (path === '/trend') return all.trend as T;
    if (path === '/bars') return all.bars as T;
    if (path === '/pies') return all.pies as T;
    if (path === '/radar') return { axes: all.radarAxes, data: all.radarValue } as T;
    if (path === '/gauge') return all.gaugeValue as T;
    if (path === '/realtime') return all.realtime as T;
    if (path === '/scatter') return all.scatter as T;
    if (path === '/notifications') return all.notifications as T;
    return all as T;
  }

  private async realFetch<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    return res.json() as Promise<T>;
  }

  setMockMode(enabled: boolean) {
    this.mockMode = enabled;
  }

  clearCache() {
    this.cache.clear();
  }
}

export const fetcher = new Fetcher('/api', true);
