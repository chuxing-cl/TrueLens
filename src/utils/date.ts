export function now(): Date {
  return new Date();
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function subDays(date: Date, days: number): Date {
  return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
}

export function getDaysArray(days: number): Date[] {
  const arr: Date[] = [];
  for (let i = days - 1; i >= 0; i--) {
    arr.push(subDays(now(), i));
  }
  return arr;
}
