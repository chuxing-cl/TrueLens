import type { KpiCardData, TrendDataPoint, ChartDataPoint, RadarAxis, RealtimeRecord } from './chart';

export interface MockDataResponse {
  kpis: KpiCardData[];
  trend: TrendDataPoint[];
  bars: ChartDataPoint[];
  pies: ChartDataPoint[];
  radarAxes: RadarAxis[];
  radarValue: number[];
  radar: { axes: RadarAxis[]; data: number[] };
  gauge: number;
  gaugeValue: number;
  realtime: RealtimeRecord[];
  scatter: Array<{ name: string; value: [number, number, number] }>;
  notifications: string[];
}
