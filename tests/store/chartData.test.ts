import { describe, it, expect } from 'vitest';
import { ChartDataModule } from '../../src/store/modules/chartData';

describe('ChartDataModule', () => {
  it('should exist and have expected methods', () => {
    const module = new ChartDataModule();
    expect(typeof module.subscribe).toBe('function');
    expect(typeof module.fetchAll).toBe('function');
    expect(typeof module.invalidate).toBe('function');
    expect(module.data).toBeDefined();
    expect(module.loading).toBe(false);
  });

  it('should cache invalidate work', () => {
    const module = new ChartDataModule();
    module.invalidate();
    expect(module.loading).toBe(false);
  });

  it('should notify subscribers on tick', async () => {
    const module = new ChartDataModule();
    let notified = false;
    const unsub = module.subscribe(() => { notified = true; });
    await module.fetchAll();
    expect(notified).toBe(true);
    unsub();
  });
});
