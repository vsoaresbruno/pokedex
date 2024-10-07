export const parseTimestamp = (timestamp: string): number => {
  console.log(timestamp)
  const dateParts = timestamp.split(',')[0].split('/')
  console.log(dateParts)
  const timeParts = timestamp.split(',')[1].split(':')
  console.log(timeParts)

  const date = new Date(
    parseInt(dateParts[2]), // year
    parseInt(dateParts[1]) - 1, // month (0-indexed)
    parseInt(dateParts[0]), // day
    parseInt(timeParts[0]), // hour
    parseInt(timeParts[1]), // minute
    parseInt(timeParts[2]) // second
  )

  return date.getTime()
}
