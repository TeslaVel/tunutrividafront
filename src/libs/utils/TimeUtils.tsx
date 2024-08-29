
import moment from 'moment-timezone'
import { Moment } from 'moment'

export const toMomentDate = (date: string, timezone?: string): Moment => {
  const setTimezone = timezone || 'America/Caracas'

  if (date?.replace) {
    const fixedDate = date.replace('UTC', '+0000')
    return moment.tz(fixedDate, 'YYYY-MM-DD hh:mm:ss Z', setTimezone)
  }

  return moment.tz(date, 'YYYY-MM-DD hh:mm:ss Z', setTimezone)
}

export const birthdateToAge = (date: string): number => {
  return moment().diff(date, 'years')
}

//'MMM D, YYYY', 'MM/DD/YYYY' or 'YYYY-MM-DD'
// 'MM/YY', 'LL H:mm' => 'January 1, 2022 12:00'
export const customDateFormat = (date: string, format: string, timezone?: string): string => {
  return `${toMomentDate(date, timezone).format(format)}`
}

export const chatDate = (date: string, showDateFromNowOnly = false): string => {
  const diffFromNow = moment(new Date()).diff(moment(date), 'hours')
  if (diffFromNow <= 24 || showDateFromNowOnly) {
    return toMomentDate(date).fromNow()
  }
  return toMomentDate(date).format('MMM D, h:mm a')
}

export const generateTimeOptions = (interval = 5, separator = ' '): Array<{ label: string, value: string }> => {
  const x = interval // minutes interval
  const times: Array<{ label: string, value: string }> = [] // time array
  let tt = 0 // start time
  const ap = ['AM', 'PM'] // AM-PM

  // loop to increment the time and push results in array
  for (let i = 0; tt < 24 * 60; i++) {
    const hh = Math.floor(tt / 60) // getting hours of day in 0-24 format
    const mm = tt % 60 // getting minutes of the hour in 0-55 format
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const label = ('' + (hh === 12 || hh === 0 ? 12 : hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2) + ' ' + ap[Math.floor(hh / 12)]
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const value = ('' + hh).slice(-2) + separator + ('0' + mm).slice(-2)
    times[i] = {
      label,
      value
    }
    tt = tt + x
  }

  return times
}

export const getDateRange = (start: string, end: string, period: 'day', format?: string): string[] => {
  const dates = [start, end].filter(date => date && moment(date).isValid())
  if (dates.length === 0) return []
  if (dates.length === 1) return [toMomentDate(dates[0]).format(format || 'MMMM D, YYYY')]

  const [from, to] = [toMomentDate(start), toMomentDate(end)]
  const diff = to.diff(from, period)
  const dateArry: string[] = []

  for (let i = 0; i <= diff; i++) {
    dateArry.push(toMomentDate(start).add(i, period).format(format || 'MMMM D, YYYY'))
  }

  return dateArry
}

export const areDatesSame = (date1: string, date2: string): boolean => {
  if (!date1 && !date2) return false

  return toMomentDate(date1).isSame(toMomentDate(date2))
}