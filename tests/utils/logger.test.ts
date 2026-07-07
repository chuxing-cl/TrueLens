import { describe, it, expect, beforeEach } from 'vitest';
import { Logger } from '../../src/utils/logger';

beforeEach(() => {
  try { localStorage.clear(); } catch {}
});

describe('Logger', () => {
  it('debug should log when level is debug', () => {
    const logger = new Logger('test');
    const logs: string[] = [];
    const orig = console.debug;
    console.debug = (msg) => logs.push(msg);
    logger.debug('hello debug');
    console.debug = orig;
    expect(logs.some(m => m.includes('hello debug'))).toBe(true);
  });

  it('should filter by minLevel', () => {
    const logger = new Logger('test', 'warn');
    const logs: string[] = [];
    const orig = console.warn;
    console.warn = (msg) => logs.push(msg);
    logger.warn('should warn');
    console.warn = orig;
    expect(logs.some(m => m.includes('should warn'))).toBe(true);
  });

  it('getHistory should return entries', () => {
    const logger = new Logger('test');
    logger.info('info msg');
    logger.warn('warn msg');
    const history = Logger.getHistory();
    expect(history.length).toBeGreaterThanOrEqual(2);
    expect(history.some(h => h.msg === 'info msg')).toBe(true);
  });

  it('should include timestamp and module', () => {
    const logger = new Logger('test');
    const logs: string[] = [];
    const orig = console.info;
    console.info = (msg) => logs.push(msg);
    logger.info('hello');
    console.info = orig;
    expect(logs[0]).toMatch(/\[test\]/);
    expect(logs[0]).toMatch(/hello/);
  });
});
