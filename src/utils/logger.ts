const STORAGE_KEY = 'truelens_logs';
const MAX_LOGS = 100;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function timestamp(): string {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  return `${hh}:${mm}:${ss}.${ms}`;
}

function readLogs(): Array<{ level: LogLevel; module: string; msg: string; time: string }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistLogs(logs: Array<{ level: LogLevel; module: string; msg: string; time: string }>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.slice(-MAX_LOGS)));
  } catch {
    // quota exceeded
  }
}

export class Logger {
  private module: string;
  private minLevel: LogLevel;
  private static history: Array<{ level: LogLevel; module: string; msg: string; time: string }> = readLogs();

  constructor(module: string, minLevel: LogLevel = 'debug') {
    this.module = module;
    this.minLevel = minLevel;
  }

  private log(level: LogLevel, msg: string) {
    if (this.levelPriority(level) < this.levelPriority(this.minLevel)) return;
    const time = timestamp();
    const prefix = `[${time}] [${this.module}]`;
    const consoleFn: Console['debug'] = console[level].bind(console);
    consoleFn && consoleFn.call(console, `${prefix} ${msg}`);

    const entry = { level, module: this.module, msg, time };
    const last = Logger.history[Logger.history.length - 1];
    if (!last || last.msg !== msg || last.level !== level || last.module !== this.module) {
      Logger.history.push(entry);
    }
    persistLogs(Logger.history);
  }

  private levelPriority(level: LogLevel): number {
    return { debug: 0, info: 1, warn: 2, error: 3 }[level];
  }

  debug(msg: string) { this.log('debug', msg); }
  info(msg: string) { this.log('info', msg); }
  warn(msg: string) { this.log('warn', msg); }
  error(msg: string) { this.log('error', msg); }

  static getHistory(): Array<{ level: LogLevel; module: string; msg: string; time: string }> {
    return [...Logger.history];
  }

  static clearHistory() {
    Logger.history = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}
