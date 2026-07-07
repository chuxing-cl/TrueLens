import { describe, it, expect } from 'vitest';
import { Fetcher } from '../../src/services/fetcher';

describe('Fetcher', () => {
  it('should return mock data for /kpi when mock mode is on', async () => {
    const fetcher = new Fetcher('/api', true);
    const data = await fetcher.request<any[]>('/kpi');
    expect(Array.isArray(data)).toBe(true);
    expect(data!.length).toBeGreaterThan(0);
    expect((data as any)[0]).toHaveProperty('title');
  });

  it('should return mocked trend data', async () => {
    const fetcher = new Fetcher('/api', true);
    const data = await fetcher.request<any[]>('/trend');
    expect(Array.isArray(data)).toBe(true);
    expect((data as any)[0]).toHaveProperty('date');
    expect((data as any)[0]).toHaveProperty('value');
  });

  it('should switch to real mode', async () => {
    const fetcher = new Fetcher('/api', true);
    fetcher.setMockMode(false);
    await expect(fetcher.request<any[]>('/kpi')).rejects.toThrow();
  });
});
