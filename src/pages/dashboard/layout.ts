import { THEME } from './themes';

export interface LayoutItem {
  id: string;
  area: 'top' | 'left' | 'center' | 'right' | 'bottom';
  order: number;
}

export const LAYOUT = {
  header: { height: 90 },
  kpi: { height: 130 },
  footer: { height: 36 },
  gap: 20,
  padding: 20,
  gridColumns: '1fr 1.6fr 1fr',
  gridRows: 'auto 1fr auto'
};

export function getStyleStr(): string {
  return `
    --primary: ${THEME.primary};
    --secondary: ${THEME.secondary};
    --accent: ${THEME.accent};
    --text: ${THEME.text};
    --text-muted: ${THEME.muted};
    --bg: ${THEME.bg};
  `;
}