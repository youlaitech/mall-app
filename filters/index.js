
/**
 * 金额转换（分->元）
 * 100 => 1
 * @param {number} num
 */
export function moneyFormatter(num) {
  return (isNaN(num) ? 0.00 : parseFloat((num / 100).toFixed(2)))
}
