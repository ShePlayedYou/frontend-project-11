const getErrorKey = (error) => {
  // Ошибка сети
  if (error.code === 'ERR_NETWORK') {
    return 'form.disconnected'
  }
  // Ошибка парсинга RSS
  if (error.message === 'parseError') {
    return 'form.parseError'
  }
  // Ошибка валидации Yup
  if (error.message?.key) {
    return error.message.key
  }
  // Всё остальное
  return 'form.invalid'
}

export default getErrorKey
