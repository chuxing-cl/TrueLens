export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  value2?: number;
}

export interface ChartTheme {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  gridColor: string;
}

export interface KpiCardData {
  title: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

export interface RadarAxis {
  name: string;
  max: number;
}

export interface RealtimeRecord {
  id: number;
  timestamp: string;
  region: string;
  metric: string;
  value: number;
  status: 'success' | 'warning' | 'error';
}
