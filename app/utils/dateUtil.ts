const formatTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return ''
    
    const date = new Date(dateTimeStr)
    const now = new Date()
    
    // 今天的日期
    const isToday = date.toDateString() === now.toDateString()
    
    if (isToday) {
      return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }
    
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

export {formatTime}