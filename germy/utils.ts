import { ViewportOptions } from 'germy/types'

export const dummy = 1

const FIRST_CAPITAL_CHAR_CODE = 'A'.charCodeAt(0)
const LAST_CAPITAL_CHAR_CODE = 'Z'.charCodeAt(0)

const isCapital = (character: string): boolean => {
  const charCode = character.charCodeAt(0)
  return (
    charCode >= FIRST_CAPITAL_CHAR_CODE
    && charCode <= LAST_CAPITAL_CHAR_CODE
  )
}

const findIndexOfFirstCapital = (value: string): number => {
  for (let i = 0; i < value.length; i++) {
    if (isCapital(value[i])) {
      return i
    }
  }

  return -1
}

const camelCaseToSnakeCase = (value: string): string => {
  let result = value
  let nextDashIndex: number

  do {
    nextDashIndex = findIndexOfFirstCapital(result)
    if (nextDashIndex >= 0) {
      result = result.substring(0, nextDashIndex)
        + result.substr(nextDashIndex + 1, 1)
        + result.substring(nextDashIndex + 2)
    }
  } while (nextDashIndex >= 0)

  return result
}

export const getViewportString = (options: ViewportOptions): string => Object
  .entries(options)
  .map(([key, val]) => `${camelCaseToSnakeCase(key)}=${val}`)
  .join(',')
