export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export function alertBar(open, type, time, message) {
  return {
    type: SHOW_MESSAGE,
    payload: {
      open,
      type,
      time,
      message,
    },
  }
}
export function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
  }
}
