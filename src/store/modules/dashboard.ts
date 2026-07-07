type Listener = () => void;

export class DashboardModule {
  private listeners: Listener[] = [];
  private _currentTime = new Date();
  private _refreshInterval = 4000;
  private _theme = 'cyber';

  get currentTime(): string {
    return this._currentTime.toLocaleTimeString('zh-CN', { hour12: false });
  }
  get refreshInterval(): number { return this._refreshInterval; }
  get theme(): string { return this._theme; }

  tick() {
    this._currentTime = new Date();
    this.notify();
  }

  subscribe(fn: Listener) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    for (const fn of this.listeners) fn();
  }
}
