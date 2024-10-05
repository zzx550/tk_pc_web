// 保留小数位
export const getFloat = (number = 0, decimalPlaces = 2) => {
  const multiplier = Math.pow(10, decimalPlaces)
  const roundedNumber = Math.round(number * multiplier) / multiplier
  const roundedString = roundedNumber.toFixed(decimalPlaces)
  return roundedString
}
