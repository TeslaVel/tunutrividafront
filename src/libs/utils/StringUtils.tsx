
export const capitalizeEach = (str?: string): string => {
  if (!str) {
    return ''
  }

  return str.replace(/\b\w/g, l => l.toUpperCase())
}

export const lowerizeEach = (str?: string): string => {
  if (!str) {
    return ''
  }

  return str.replace(/\b\w/g, l => l.toLowerCase())
}

export const capitalize = (str?: string): string => {
  if (!str) {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const pluralize = (total: number, singularString: string, suffix?: string, hideTotal?: boolean): string => {
  if ((!total && total !== 0) || !singularString) return ''

  return `${hideTotal
    ? ''
    : `${total}`} ${singularString}${total !== 1
    ? suffix || 's'
    : ''}`
}

export const shortenFullName = (name: string): string => {
  const [firstName, secondName] = name.split(' ')
  return [firstName, `${secondName.charAt(0)}.`].join(' ')
}

export const snakeToCamel = (word: string): string => {
  return word.replace(/([-_]\w)/g, g => g[1].toUpperCase())
}

export const camelToSnake = (word: string): string => {
  return word.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

export const titleize = (str: string): string => {
  return capitalizeEach(splitUnderscore(str))
}

export const splitUnderscore = (str: string): string => {
  return str.replace(/_/g, ' ')
}


