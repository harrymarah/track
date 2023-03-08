const mapRanges = (minA, maxA, minB, maxB, valueA) => {
  const valueB = minB + ((valueA - minA) * (maxB - minB)) / (maxA - minA)
  return valueB
}

export default mapRanges
