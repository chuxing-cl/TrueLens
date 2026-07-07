import type { MockDataResponse } from '../../types/mock';
import { fetcher } from '../../services/fetcher';

type Listener = () => void;

export class ChartDataModule {
  private listeners: Listener[] = [];
  private _data: Partial<MockDataResponse> = {};
  private _loading = false;
  private _error: string | null = null;

  get data(): Partial<MockDataResponse> { return this._data; }
  get loading(): boolean { return this._loading; }
  get error(): string | null { return this._error; }

  subscribe(fn: Listener) {
    this.listeners.push(fn);
    return () => { this.listeners = this.listeners.filter(l => l !== fn); };
  }

  private notify() {
    for (const fn of this.listeners) fn();
  }

  async fetchAll() {
    this._loading = true;
    this._error = null;
    this.notify();
    try {
      const [kpis, trend, bars, pies, radar, gauge, realtime, scatter, notifications] = await Promise.all([
        fetcher.request<any[]>('/kpi'),
        fetcher.request<any[]>('/trend'),
        fetcher.request<any[]>('/bars'),
        fetcher.request<any[]>('/pies'),
        fetcher.request<any>('/radar'),
        fetcher.request<number>('/gauge'),
        fetcher.request<any[]>('/realtime'),
        fetcher.request<any[]>('/scatter'),
        fetcher.request<string[]>('/notifications')
      ]);
      this._data = {
        kpis: kpis as any,
        trend: trend as any,
        bars: bars as any,
        pies: pies as any,
        radar: radar as any,
        gauge: gauge as any,
        realtime: realtime as any,
        scatter: scatter as any,
        notifications: notifications as any
      };
    } catch (e) {
      this._error = String(e);
    } finally {
      this._loading = false;
      this.notify();
    }
  }

  invalidate() {
    fetcher.clearCache();
  }
}
