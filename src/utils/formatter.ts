export function formatNumber(value: number): string {
  if (value >= 1e8) {
    return (value / 1e8).toFixed(2) + '亿';
  }
  if (value >= 1e4) {
    return (value / 1e4).toFixed(2) + '万';
  }
  if (value >= 1000) {
    return value.toFixed(0);
  }
  return value.toFixed(2);
}

export function formatPercent(value: number): string {
  return value.toFixed(1) + '%';
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export function formatTimeShort(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${h}:${min}:${s}`;
}
