export function toPercentage(value: number, total: number) {
  const percentage = (value / total) * 100
  return Number(percentage.toFixed(2))
}
