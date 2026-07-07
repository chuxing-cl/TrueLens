import { describe, it, expect } from 'vitest';
import { formatNumber, formatPercent, formatDate, formatTimeShort } from '../../src/utils/formatter';

describe('formatter', () => {
  it('should format large numbers', () => {
    expect(formatNumber(100000)).toBe('10.00万');
  });

  it('should format billions', () => {
    expect(formatNumber(500000000)).toBe('5.00亿');
  });

  it('should format percent', () => {
    expect(formatPercent(12.345)).toBe('12.3%');
  });

  it('should format date', () => {
    const str = formatDate(new Date('2026-07-07T12:30:00'));
    expect(str).toContain('2026-07-07');
    expect(str).toContain('12:30:00');
  });

  it('should format time short', () => {
    expect(formatTimeShort(new Date('2026-07-07T12:30:00'))).toBe('12:30:00');
  });
});
